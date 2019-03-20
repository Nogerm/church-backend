import React, { Component}  from 'react';
import { Image, Header, Button, Segment, Form, TextArea, Dropdown } from 'semantic-ui-react'
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';

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
/*
  handleCodeChange = (e, { value }) => {
    this.props.contentCallback(this.props.idx, value);
  }
*/
  handleDeleteClicked = (e, { value }) => {
    this.props.deleteCallback(this.props.id, value);
  }

  handleJSONChange = (e) => {
    //console.log("event" + JSON.stringify(e));
    this.props.contentCallback(this.props.id, e);
  }

  renderContent = () => {
    const handleJSONChange = this.handleJSONChange;
    const placeholder = this.props.default || {"type":"text", "text":"您好！"}
    if(this.state.type === "text" || this.state.type === "sticker" || this.state.type === "location" || this.state.type === "confirm") {
      //Messages don't need image or file upload
      return (
        <div>
          <p>2. 使用 Bot Designer 設計好訊息</p>
          <p>3. 複製貼上 Bot Designer 產生的程式</p>
          <JSONInput
            id          = 'a_unique_id'
            placeholder = { placeholder }
            locale      = { locale }
            height      = '100px'
            onChange    = {handleJSONChange}
          />
        </div>
        
      )
    } else if(this.state.type === "image") {
      return (
        <div></div>
      )
    } else if(this.state.type === "video") {
      return (
        <div></div>
      )
    } else if(this.state.type === "audio") {
      return (
        <div></div>
      )
    } else if(this.state.type === "imagemap") {
      return (
        <div></div>
      )
    } else if(this.state.type === "buttons") {
      return (
        <div></div>
      )
    } else if(this.state.type === "carousel") {
      return (
        <div></div>
      )
    }
  }

	render() {
    const renderContent = this.renderContent;
    const msgTypeOptions = [
      { key: 'text',     text: '文字',    value: 'text' },
      { key: 'image',    text: '圖片',    value: 'image' },
      { key: 'video',    text: '影片',    value: 'video' },
      { key: 'audio',    text: '語音',    value: 'audio' },
      { key: 'sticker',  text: '貼圖',    value: 'sticker' },
      { key: 'imagemap', text: '影像地圖', value: 'imagemap' },
      { key: 'location', text: '位置',    value: 'location' },
      { key: 'confirm',  text: '確認範本', value: 'confirm' },
      { key: 'buttons',  text: '按鍵範本', value: 'buttons' },
      { key: 'carousel', text: '輪播範本', value: 'carousel' }
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
