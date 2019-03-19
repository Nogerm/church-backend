import React, { Component}  from 'react';
import { Image, Header, Button, Segment, Form, TextArea, Dropdown } from 'semantic-ui-react'

export default class EditReply extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type || ""
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
    this.props.contentCallback(this.props.idx, value);
  }

  handleDeleteClicked = (e, { value }) => {
    this.props.deleteCallback(this.props.id, value);
  }

  renderContent = () => {
    if(this.state.type === "Text" || this.state.type === "Sticker" || this.state.type === "Location" || this.state.type === "Confirm") {
      //Messages don't need image or file upload
      return (
        <div>
          <p>2. 使用 Bot Designer 設計好訊息</p>
          <p>3. 複製貼上 Bot Designer 產生的程式</p>
          <Form>
            <TextArea placeholder='貼上程式碼' style={{ minHeight: 100 }} onChange={this.handleCodeChange}/>
          </Form>
        </div>
        
      )
    } else if(this.state.type === "Image") {
      return (
        <div></div>
      )
    } else if(this.state.type === "Video") {
      return (
        <div></div>
      )
    } else if(this.state.type === "Audio") {
      return (
        <div></div>
      )
    } else if(this.state.type === "Imagemap") {
      return (
        <div></div>
      )
    } else if(this.state.type === "Buttons") {
      return (
        <div></div>
      )
    } else if(this.state.type === "Carousel") {
      return (
        <div></div>
      )
    }
  }

	render() {
    const renderContent = this.renderContent;
    const msgTypeOptions = [
      { key: 'Text',     text: '文字',    value: 'Text' },
      { key: 'Image',    text: '圖片',    value: 'Image' },
      { key: 'Video',    text: '影片',    value: 'Video' },
      { key: 'Audio',    text: '語音',    value: 'Audio' },
      { key: 'Sticker',  text: '貼圖',    value: 'Sticker' },
      { key: 'Imagemap', text: '影像地圖', value: 'Imagemap' },
      { key: 'Location', text: '位置',    value: 'Location' },
      { key: 'Confirm',  text: '確認範本', value: 'Confirm' },
      { key: 'Buttons',  text: '按鍵範本', value: 'Buttons' },
      { key: 'Carousel', text: '輪播範本', value: 'Carousel' }
    ];

		return (
      <Segment>
        <Header as="h3">訊息#{this.props.idx+1}
          <Button floated='right' style={{color:'white', background:'#d32f2f'}} onClick={this.handleDeleteClicked}>刪除</Button>
        </Header>
        <p>1. 選擇要新增的訊息類別</p>
        <Dropdown placeholder='Select message type' options={msgTypeOptions} selection onChange={this.onTypeChange}></Dropdown>
        {renderContent()}
      </Segment>
		)
	}

}
