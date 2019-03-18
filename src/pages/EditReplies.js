import React, { Component}  from 'react';
import axios from 'axios';
import { Grid, Menu, Image, Header, Button, Segment } from 'semantic-ui-react'
import EditReply from './EditReply';

const MAX_REPLY_NUM = 5;

export default class EditReplies extends Component {

	constructor(props) {
    super(props);
    this.state = {
      messageArray: [{}, {}]
    };
  }
  
  addReplyMsg = () => {
    if(this.state.messageArray.length < MAX_REPLY_NUM) {
      this.setState({
        messageArray: [...this.state.messageArray, {}]
      })
    }
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

  handleSaveClicked = () => {

  }

	render() {
    const messageArray = this.state.messageArray;
    const renderAddMessage = this.renderAddMessage;
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
              <EditReply key={index}/>
            )
          })}
          {renderAddMessage()}
        </Segment.Group>
        <Button floated='left' style={{color:'white', background:'#00B300', margin:'8px'}} onClick={this.handleSaveClicked}>儲存</Button>
      </div>
		)
	}
	
}