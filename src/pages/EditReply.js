import React, { Component}  from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Grid, Menu, Image, Header, Button, Segment, Loader, Form, TextArea, Dropdown } from 'semantic-ui-react'

export default class EditReply extends Component {

	render() {

    const msgTypeOptions = [
      {
        key: 'Text',
        text: 'Text',
        value: 'Text'
      },
      {
        key: 'Image',
        text: 'Image',
        value: 'Image'
      }
    ];

		return (
      <Segment>
        <Dropdown placeholder='Select message type' options={msgTypeOptions} selection></Dropdown>
        <Form>
          <TextArea placeholder='Tell us more' style={{ minHeight: 100 }} />
        </Form>
      </Segment>
		)
	}

}
