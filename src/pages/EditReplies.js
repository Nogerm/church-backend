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
      messageArray: []
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
    })
    .catch(error => {
      console.log("[queryReplyMsg] error" + error);
    });
  }
  
  addReplyMsg = () => {
    if(this.state.messageArray.length < MAX_REPLY_NUM) {
      const newMessage = {
        _id: new ObjectID().id
      }
      this.setState({
        messageArray: [...this.state.messageArray, newMessage]
      }, () => {
        console.log("add message id: " + newMessage._id);
      });
    }
  }

  handleContentDelete = (id) => {
    const newArray = [...this.state.messageArray]
    const deleteIdx = newArray.findIndex(item => item._id === id);
    newArray.splice(deleteIdx, 1);
    this.setState({
      messageArray: [...newArray]
    }, () => {
      console.log("Delete message id: " + id);
    });
  }

  handleContentChange = (id, newContent) => {
    const newArray = [...this.state.messageArray]
    newArray.splice(id, 1, JSON.parse(newContent));
    this.setState({
      messageArray: [...newArray]
    }, () => {
      console.log("handleContentChange: " + this.state.messageArray);
    });
  }

  handleSaveClicked = () => {
    const post_url = BASE_URL + this.props.path;
    const headers = {
      'content-type': 'application/json'
    }
    const data = {
      messages: this.state.messageArray
    }
    axios.post(post_url, data, headers)
    .then(response => {
      console.log("[handleContentChange] success");
    })
    .catch(error => {
      console.log("[handleContentChange] error" + error);
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
        <a href="https://developers.line.biz/console/fx/" rel="noopener noreferrer" target="_blank" title="Flex simulator 下載連結">Flex simulator 下載連結</a>
        <Segment.Group raised>
          {messageArray.map(function(message, index){
            return (
              <EditReply key={message._id} id={message._id} idx={index} type={message.type} contentCallback={handleContentChange} deleteCallback={handleContentDelete}/>
            )
          })}
          {renderAddMessage()}
        </Segment.Group>
        <Button floated='left' style={{color:'white', background:'#00B300'}} onClick={this.handleSaveClicked}>儲存</Button>
      </div>
		)
	}
	
}