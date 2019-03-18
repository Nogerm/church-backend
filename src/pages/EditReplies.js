import React, { Component}  from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
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

	render() {
    const messageArray = this.state.messageArray;
    const renderAddMessage = this.renderAddMessage;
		return (
			<Segment.Group raised>
        {messageArray.map(function(message, index){
          return (
            <EditReply/>
          )
        })}
        {renderAddMessage()}
      </Segment.Group>
		)
	}
	
}