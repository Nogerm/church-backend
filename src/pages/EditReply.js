import React, { Component}  from 'react';
import { Image, Header, Button, Segment, Dropdown, Icon } from 'semantic-ui-react'
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import FileBase64 from 'react-file-base64';

export default class EditReply extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type || "",
      file: {},
      fileUrl: ""
    };
  }

  onTypeChange = (e, { value }) => {
    this.setState({
      type: value
    },()=>{
      console.log(this.state.type);
    })
  }

  handleDeleteClicked = (e, { value }) => {
    this.props.deleteCallback(this.props.id, value);
  }

  handleJSONChange = (e) => {
    //console.log("event" + JSON.stringify(e));
    this.props.contentCallback(this.props.id, e);
  }

  handleFileChange = (file) => {
    console.log(JSON.stringify(file));
    console.log("size:" + parseInt(file.size));
    if(parseInt(file.size) < 1000) {
      //size OK
      this.setState({ 
        file: file
      });
    } else {
      alert("檔案超過 1Mb!");
    }
  }

  getTemplateFromType = (type) => {
    if      (type === 'text')     return {"type":"text", "text":"您好！"}
    else if (type === 'image')    return {"type": "image", "originalContentUrl": "https://example.com/original.jpg", "previewImageUrl": "https://example.com/preview.jpg"}
    else if (type === 'video')    return {"type": "video", "originalContentUrl": "https://example.com/original.mp4", "previewImageUrl": "https://example.com/preview.jpg"}
    else if (type === 'audio')    return {"type": "audio", "originalContentUrl": "https://example.com/original.m4a", "duration": 60000}
    else if (type === 'sticker')  return {"type": "sticker", "packageId": "1", "stickerId": "1"}
    else if (type === 'imagemap') return {"type":"imagemap", "baseUrl":"https://example.com/", "altText": "This is an imagemap", "actions": ""}
    else if (type === 'location') return {"type": "location", "title": "my location", "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１", "latitude": 35.65910807942215, "longitude": 139.70372892916203}
    else if (type === 'confirm')  return {"type":"template", "template":""}
    else if (type === 'buttons')  return {"type":"template", "template":""}
    else if (type === 'carousel') return {"type":"template", "template":""}
    else return {}
  }

  renderContent = () => {
    const handleJSONChange = this.handleJSONChange;
    const placeholder = this.props.defaultContent.type === this.state.type ? this.props.defaultContent : this.getTemplateFromType(this.state.type)
    if(this.state.type === "text" || this.state.type === "sticker" || this.state.type === "location" || this.state.type === "confirm") {
      //Messages don't need image or file upload
      return (
        <div>
          <p>2. 使用 Bot Designer 設計好訊息</p>
          <p>3. 複製貼上 Bot Designer 產生的程式</p>
          <JSONInput
            id          = { this.props.id }
            placeholder = { placeholder }
            locale      = { locale }
            height      = '100px'
            onChange    = { handleJSONChange }
          />
        </div>
        
      )
    } else if(this.state.type === "image") {
      const fileUrl = this.state.fileUrl === "" ? "尚未上傳完成" : this.state.fileUrl;
      return (
        <div>
          <p>2. 選擇要上傳的圖片 (必須小於1Mb)</p>
          <FileBase64 multiple={ false } onDone={ this.handleFileChange.bind(this) } />
          <p>3. 等待上傳後，伺服器回傳圖片網址</p>
          <p>{fileUrl}</p>
          <p>4. 複製貼上 Bot Designer 產生的程式，並將 originalContentUrl 和 previewImageUrl 取代</p>
          <JSONInput
            id          = { this.props.id }
            placeholder = { placeholder }
            locale      = { locale }
            height      = '100px'
            onChange    = { handleJSONChange }
          />
        </div>
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
        <Dropdown placeholder='Select message type' options={msgTypeOptions} selection defaultValue={this.props.defaultContent.type} onChange={this.onTypeChange}></Dropdown>
        {renderContent()}
      </Segment>
		)
	}

}
