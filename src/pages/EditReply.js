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

  onTypeChange = (e, { value }) => {
    this.setState({
      type: value
    },()=>{
      console.log(this.state.type);
    })
  }

  onRemoveMsg = () => {
    //remove this message
  }

  handleCodeChange = (e, { value }) => {
    this.props.callback(this.props.idx, value);
  }

  renderContent = () => {
    if(this.state.type === "Text") {
      return (
        <div>
          <p>2. 使用 Bot Designer 設計好訊息</p>
          <p>3. 複製貼上 Bot Designer 產生的程式</p>
          <Form>
            <TextArea placeholder='貼上程式碼' style={{ minHeight: 100 }} onChange={this.handleCodeChange}/>
          </Form>
        </div>
        
      )
    }
  }

	render() {
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
        <Dropdown placeholder='Select message type' options={msgTypeOptions} selection onChange={this.onTypeChange}></Dropdown>
        {renderContent()}
      </Segment>
		)
	}

}
