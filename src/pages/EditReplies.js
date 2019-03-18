import React, { Component}  from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Grid, Menu, Image, Header, Button, Segment } from 'semantic-ui-react'
import EditReply from './EditReply';

export default class EditReplies extends Component {

	constructor(props) {
    super(props);
    this.state = {
      messageArray: [{}, {}]
    };
  }
  
  renderAddMessage = () => {
    const MAX_REPLY_NUM = 5;
    if(this.state.messageArray.length < MAX_REPLY_NUM) {
      return (
        <Segment>
          <Button fluid>點我新增回應訊息</Button>
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