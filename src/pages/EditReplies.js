import React, { Component}  from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Grid, Menu, Image, Header, Button, Segment } from 'semantic-ui-react'
import EditReply from './EditReply';

export default class EditReplies extends Component {

	constructor(props) {
    super(props);
    this.state = {
      activeItem: '修改圖文選單',
    };
	}

	render() {
		return (
			<Segment.Group raised>
        <EditReply/>
        <EditReply/>
        <EditReply/>
        <EditReply/>
        <EditReply/>
      </Segment.Group>
		)
	}
	
}