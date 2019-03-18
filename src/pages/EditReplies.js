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

	render() {
    const messageArray = this.state.messageArray;
		return (
			<Segment.Group raised>
        {messageArray.map(function(message, index){
          return (
            <EditReply/>
          )
        })}
      </Segment.Group>
		)
	}
	
}