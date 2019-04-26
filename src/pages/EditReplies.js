import React, { Component}  from 'react';
import packageJson from '../../package.json';
import axios from 'axios';
import { ObjectID } from 'bson';
import { Header, Button, Segment } from 'semantic-ui-react'
import EditReply from './EditReply';

const MAX_REPLY_NUM = 5;

export default class EditReplies extends Component {

	constructor(props) {
    super(props);
    this.state = {
      keywordObj: this.props.keyword || {},
      messageArray: [],
      hasAnyError: false,
      isUploading: false
    };
  }

  componentDidMount() {
    if(this.state.keywordObj.hasOwnProperty("_id")) {
      this.queryKeywordReplyMsg();
    } else {
      this.queryNoKeywordReplyMsg();
    }
  }

  queryKeywordReplyMsg = () => {
    const get_url = packageJson.server + '/keywords';
    axios.get(get_url)
    .then(response => {
      const keywordReplyObj = response.data.find(item => item._id === this.state.keywordObj._id);
      console.log("[queryKeywordReplyMsg] success" + JSON.stringify(response));
      let initArray = [];
      for (var idx = 0; idx < keywordReplyObj.messages.length; idx++) {
        const messageObj = {
          _id: keywordReplyObj.messages[idx]._id,
          content: keywordReplyObj.messages[idx],
          editContent: ""
        }
        initArray.push(messageObj);
      }
      this.setState({
        messageArray: initArray
      });
    })
    .catch(error => {
      console.log("[queryKeywordReplyMsg] error" + error);
    });
  }
  
  queryNoKeywordReplyMsg = () => {
    const get_url = packageJson.server + '/no_keyword';
    console.log();
    axios.get(get_url)
    .then(response => {
      const noKeywordReplyObj = response.data;
      console.log("[queryNoKeywordReplyMsg] success" + JSON.stringify(response.data));
      let initArray = [];
      for (var idx = 0; idx < noKeywordReplyObj.length; idx++) {
        const messageObj = {
          _id: noKeywordReplyObj[idx]._id,
          content: noKeywordReplyObj[idx],
          editContent: ""
        }
        initArray.push(messageObj);
      }
      this.setState({
        messageArray: initArray
      });
    })
    .catch(error => {
      console.log("[queryNoKeywordReplyMsg] error" + error);
    });
  }

  addReplyMsg = () => {
    if(this.state.messageArray.length < MAX_REPLY_NUM) {
      const newMessage = {
        _id: new ObjectID().toHexString(),
        type: "text",
        text: ""
      }
      const messageObj = {
        _id: newMessage._id,
        content: newMessage,
        editContent: ""
      }
      this.setState({
        messageArray: [...this.state.messageArray, messageObj]
      }, () => {
        console.log("add message: " + JSON.stringify(messageObj));
      });
    }
    this.props.editCallback(true, 'add');
  }

  handleContentDelete = (id) => {
    const newMessageArray = [...this.state.messageArray];
    const deleteIdx = newMessageArray.findIndex(item => item._id === id);
    newMessageArray.splice(deleteIdx, 1);
    this.setState({
      messageArray: [...newMessageArray]
    }, () => {
      console.log("Delete message id: " + id);
    });
    this.props.editCallback(true, 'delete');
  }

  handleContentChange = (id, jsonState) => {
    const newMessageArray = [...this.state.messageArray]
    const updateIdx = newMessageArray.findIndex(item => item._id === id);
    const updateObj = newMessageArray.find(item => item._id === id);
    updateObj.editContent = jsonState;
    newMessageArray.splice(updateIdx, 1, updateObj);
    this.setState({
      messageArray: [...newMessageArray]
    });
    this.props.editCallback(true, 'update');
  }

  handleSaveClicked = () => {
    //check json valid
    let hasError = false;
    let msgArray = [...this.state.messageArray];
    let queryArray = [];
    for(let idx = 0; idx < this.state.messageArray.length; idx++) {
      let msgObj = this.state.messageArray[idx];
      if(msgObj.editContent === "") {
        //not edited
      } else {
        if(msgObj.editContent.error !== false) {
          hasError = true;
        } else {
          msgObj.content = msgObj.editContent.jsObject;
          msgArray.splice(idx, 1, msgObj);
        }
      }
      queryArray.push(msgObj.content);
    }
    this.setState({
      hasAnyError: hasError,
      messageArray: msgArray,
      isUploading: true
    }, () => {
      console.log("Check result has error: " + this.state.hasAnyError);
      console.log("query array: " + JSON.stringify(queryArray));
      if(!this.state.hasAnyError) {
        this.sendUpdateRequest(queryArray);
      } else {
        alert("訊息格式錯誤，請先修正再儲存");
      }
    });
  }

  sendUpdateRequest = (queryArray) => {
    const post_url = packageJson.server + '/update_keyword_msgs';
    const configs = {
      headers: {
        'content-type': 'application/json'
      }
    }
    const data = {
      _id: this.state.keywordObj._id,
      label: this.state.keywordObj.label,
			value: this.state.keywordObj.value,
      messages: queryArray
    }
    axios.post(post_url, data, configs)
    .then(response => {
      console.log("[sendUpdateRequest] success");
      alert("訊息儲存成功！");
      this.setState({
        isUploading: false
      });
    })
    .catch(error => {
      console.log("[sendUpdateRequest] error" + error);
      alert("訊息儲存失敗，錯誤訊息：" + error);
      this.setState({
        isUploading: false
      });
    });
  }

  renderAddMessage = () => {
    if(this.state.messageArray.length < MAX_REPLY_NUM) {
      return (
        <Segment>
          <Button fluid onClick={this.addReplyMsg}>點我新增回應訊息</Button>
        </Segment>
      )
    }
  }

	render() {
    const { keywordObj, messageArray } = this.state;
    const renderAddMessage = this.renderAddMessage;
    const handleContentChange = this.handleContentChange;
    const handleContentDelete = this.handleContentDelete;
		return (
      <div style={{paddingBottom: '50px'}}>
        <Header as="h2"  style={{fontFamily: 'Noto Sans TC'}}>{keywordObj.label} (最多5則訊息)</Header>
        <a href="https://developers.line.biz/en/services/bot-designer/" rel="noopener noreferrer" target="_blank" title="Bot designer 下載連結">Bot designer 下載連結</a>
        {messageArray.map(function(messageObj, index){
          return (
            <EditReply key={index} id={messageObj._id} idx={index} type={messageObj.content.type} defaultContent={messageArray[index].content} contentCallback={handleContentChange} deleteCallback={handleContentDelete}/>
          )
        })}
        {renderAddMessage()}
        <Button floated='left' style={{color:'white', background:'#00B300'}} onClick={this.handleSaveClicked} loading={this.state.isUploading}>儲存</Button>
      </div>
		)
	}
	
}