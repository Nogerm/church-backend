import React, { Component}  from 'react';
import axios from 'axios';
import { ObjectID } from 'bson';
import { Header, Button, Segment } from 'semantic-ui-react'
import EditReply from './EditReply';

const BASE_URL = "https://nogerm-demo-test.herokuapp.com/";
const MAX_REPLY_NUM = 5;

export default class EditReplies extends Component {

	constructor(props) {
    super(props);
    this.state = {
      messageArray: [],
      hasAnyError: false
    };
  }

  componentDidMount() {
    this.queryReplyMsg();
  }

  queryReplyMsg = () => {
    const get_url = BASE_URL + this.props.path;
    axios.get(get_url)
    .then(response => {
      console.log("[queryReplyMsg] success" + JSON.stringify(response));
      let initArray = [];
      for (var idx = 0; idx < response.data.length; idx++) {
        const messageObj = {
          _id: response.data[idx]._id,
          content: response.data[idx],
          editContent: ""
        }
        initArray.push(messageObj);
      }
      this.setState({
        messageArray: initArray
      });
    })
    .catch(error => {
      console.log("[queryReplyMsg] error" + error);
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
      messageArray: msgArray
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
    const post_url = BASE_URL + this.props.path;
    const configs = {
      headers: {
        'content-type': 'application/json'
      }
    }
    const data = {
      messages: queryArray
    }
    axios.post(post_url, data, configs)
    .then(response => {
      console.log("[sendUpdateRequest] success");
      alert("訊息儲存成功！");
    })
    .catch(error => {
      console.log("[sendUpdateRequest] error" + error);
      alert("訊息儲存失敗，錯誤訊息：" + error);
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
    const messageArray = this.state.messageArray;
    const renderAddMessage = this.renderAddMessage;
    const handleContentChange = this.handleContentChange;
    const handleContentDelete = this.handleContentDelete;
		return (
      <div>
        <Header as="h1"  style={{fontFamily: 'Noto Sans TC'}}>編輯回應訊息(最多5則)</Header>
        <p style={{fontFamily: 'Noto Sans TC'}}>需配合 Bot designer 或 flex simulator 使用</p>
        <a href="https://developers.line.biz/en/services/bot-designer/" rel="noopener noreferrer" target="_blank" title="Bot designer 下載連結">Bot designer 下載連結</a>
        <br/>
        <a href="https://developers.line.biz/console/fx/" rel="noopener noreferrer" target="_blank" title="Flex simulator 線上編輯器">Flex simulator 線上編輯器</a>
        {messageArray.map(function(messageObj, index){
          return (
            <EditReply key={messageObj._id} id={messageObj._id} idx={index} type={messageObj.content.type} defaultContent={messageArray[index].content} contentCallback={handleContentChange} deleteCallback={handleContentDelete}/>
          )
        })}
        {renderAddMessage()}
        <Button floated='left' style={{color:'white', background:'#00B300'}} onClick={this.handleSaveClicked}>儲存</Button>
      </div>
		)
	}
	
}