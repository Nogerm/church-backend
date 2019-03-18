import React, { Component}  from 'react';
import axios from 'axios';
import { Image, Header, Button, Segment, Form, TextArea, Dropdown, Container } from 'semantic-ui-react'

export default class EditReply extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: ""
    };
  }

  onChange = (e, { value }) => {
    this.setState({
      type: value
    },()=>{
      console.log(this.state.type);
    })
  }

  renderContent = () => {
    if(this.state.type === "Text") {
      return (
        <Container>
          <p>2. 使用 Bot Designer 設計好訊息</p>
          <p>3. 複製貼上 Bot Designer 產生的程式</p>
          <Form>
            <TextArea placeholder='Tell us more' style={{ minHeight: 100 }} />
          </Form>
        </Container>
        
      )
    }
  }

	render() {
    const { type } = this.state;
    const renderContent = this.renderContent;
    const msgTypeOptions = [
      {
        key: 'Text',
        text: '文字',
        value: 'Text'
      },
      {
        key: 'Image',
        text: '圖片',
        value: 'Image'
      }
    ];

		return (
      <Segment>
        <p>1. 選擇要新增的訊息類別</p>
        <Dropdown placeholder='Select message type' options={msgTypeOptions} selection onChange={this.onChange}></Dropdown>
        {renderContent()}
      </Segment>
		)
	}

}
