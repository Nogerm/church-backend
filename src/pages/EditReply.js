import React, { Component}  from 'react';
import { Image, Header, Button, Segment, Dropdown, Label, Divider, Loader } from 'semantic-ui-react'
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import FileBase64 from 'react-file-base64';
import axios from 'axios';

const BASE_URL = "https://nogerm-demo-test.herokuapp.com/";

export default class EditReply extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type || "",
      file: {},
      fileUrl: "",
      filePreviewUrl: "",
      fileBaseUrl: "",
      thumbHeight: "",
      isuploading: false
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
    console.log("event" + JSON.stringify(e));

    //auto replace baseURL for imagemap
    if(this.state.type === 'imagemap' && this.state.fileBaseUrl !== "") {
      e.jsObject.baseUrl = this.state.fileBaseUrl;
    }

    //auto replace hero image for flex
    if(this.state.type === 'flex' && this.state.fileUrl !== "") {
      e.jsObject.contents.hero.url = this.state.fileUrl;
    }

    this.props.contentCallback(this.props.id, e);
  }

  handleFileChange = (file) => {
    console.log(JSON.stringify(file));
    console.log("size:" + parseInt(file.size));
    if(parseInt(file.size) < 1000) {
      //size OK
      this.setState({ 
        file: file,
        fileUrl: "",
        filePreviewUrl: "",
        isuploading: true
      });
      if(this.state.type === 'image') {
        //upload image, get url and preview url
        const post_url = BASE_URL + 'image_msg_upload';
        const data = {
          binary: file.base64,
          folder_name: this.props.path
        }
        axios.post(post_url, data, {
          headers:{
            'content-type': 'application/json'
          }
        })
        .then(response => {
          console.log("[sendUpdateRequest] success");
          alert("檔案上傳成功！");
          this.setState({ 
            fileUrl: response.data.fileUrl,
            filePreviewUrl: response.data.filePreviewUrl,
            isuploading: false
          }, () => {
            const imageMsgObj = {
              "jsObject": {
                "type": "image",
                "originalContentUrl": this.state.fileUrl,
                "previewImageUrl": this.state.filePreviewUrl,
                "animated": false
              },
              "error": false
            }
            this.props.contentCallback(this.props.id, imageMsgObj);
          });
        })
        .catch(error => {
          console.log("[sendUpdateRequest] error" + error);
          alert("檔案上傳失敗，錯誤訊息：" + error);
        });
      } else if(this.state.type === 'imagemap') {
        //upload image, get base url
        const post_url = BASE_URL + 'imagemap_image_upload';
        const data = {
          binary: file.base64,
          folder_name: this.props.path
        }
        axios.post(post_url, data, {
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(response => {
          console.log("[sendUpdateRequest] success");
          alert("檔案上傳成功！");
          this.setState({ 
            fileBaseUrl: response.data.file_base_url,
            thumbHeight: response.data.thumb_height,
            isuploading: false
          });
        })
        .catch(error => {
          console.log("[sendUpdateRequest] error" + error);
          alert("檔案上傳失敗，錯誤訊息：" + error);
        });
      } else if(this.state.type === 'flex') {
        //upload image, get url
        const post_url = BASE_URL + 'image_upload';
        const data = {
          binary: file.base64,
          folder_name: this.props.path
        }
        axios.post(post_url, data, {
          headers:{
            'content-type': 'application/json'
          }
        })
        .then(response => {
          console.log("[sendUpdateRequest] success");
          alert("檔案上傳成功！");
          this.setState({ 
            fileUrl: response.data.fileUrl,
            isuploading: false
          });
        })
        .catch(error => {
          console.log("[sendUpdateRequest] error" + error);
          alert("檔案上傳失敗，錯誤訊息：" + error);
        });
      }
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
    else if (type === 'flex')     return {"type": "flex", "altText": "This is a Flex Message", "contents": {"type": "bubble", "body": {"type": "box", "layout": "horizontal", "contents": [{ "type": "text", "text": "Hello," }, { "type": "text", "text": "World!" }]}}}
    else return {}
  }

  renderContent = () => {
    const handleJSONChange = this.handleJSONChange;
    const placeholder = this.props.defaultContent.type === this.state.type ? this.props.defaultContent : this.getTemplateFromType(this.state.type);

    if(this.state.type === "text" || this.state.type === "location" || this.state.type === "confirm") {
      //Messages don't need image or file upload
      return (
        <div>
          <p>2. 使用 Bot Designer 設計好訊息</p>
          <p>3. 複製貼上 Bot Designer 產生的程式</p>
          <JSONInput
            id          = { this.props.id }
            placeholder = { placeholder }
            locale      = { locale }
            height      = '110px'
            onChange    = { handleJSONChange }
          />
        </div>
      )
    } else if(this.state.type === "sticker") {
      return (
        <div>
          <a href="https://devdocs.line.me/files/sticker_list.pdf" rel="noopener noreferrer" target="_blank" title="可以用的貼圖列表">可以用的貼圖列表</a>
          <p>2. 使用 Bot Designer 設計好訊息</p>
          <p>3. 複製貼上 Bot Designer 產生的程式</p>
          <JSONInput
            id          = { this.props.id }
            placeholder = { placeholder }
            locale      = { locale }
            height      = '130px'
            onChange    = { handleJSONChange }
          />
        </div>
      )
    } else if(this.state.type === "image") {
      const imageSrc = this.state.file.hasOwnProperty("base64") ? this.state.file.base64 : this.props.defaultContent.hasOwnProperty("previewImageUrl") ? this.props.defaultContent.previewImageUrl : "";
      return (
        <div>
          <p>2. 選擇要上傳的圖片 (必須小於1Mb)</p>
          <FileBase64 multiple={ false } onDone={ this.handleFileChange.bind(this) } />
          <Image src={imageSrc} size='medium'>
            <Loader active={this.state.isuploading} inline />
          </Image>
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
      const imageSrc = this.state.file.hasOwnProperty("base64") ? this.state.file.base64 : this.props.defaultContent.hasOwnProperty("previewImageUrl") ? this.props.defaultContent.previewImageUrl : "";
      return (
        <div>
          <p>2. 選擇要上傳的圖片</p>
          <FileBase64 multiple={ false } onDone={ this.handleFileChange.bind(this) } />
          <Image src={imageSrc} size='medium'>
            <Loader active={this.state.isuploading} inline />
          </Image>
          <div>3. 複製貼上 Bot Designer 產生的程式，<Label>altText</Label>輸入在不支援的裝置上要顯示的文字</div>
          <JSONInput
            id          = { this.props.id }
            placeholder = { placeholder }
            locale      = { locale }
            height      = '150px'
            onChange    = { handleJSONChange }
          />
        </div>
      )
    } else if(this.state.type === "buttons") {
      return (
        <div></div>
      )
    } else if(this.state.type === "carousel") {
      return (
        <div></div>
      )
    } else if(this.state.type === "flex") {
      const imageSrc = this.state.file.hasOwnProperty("base64") ? this.state.file.base64 : this.props.defaultContent.hasOwnProperty("previewImageUrl") ? this.props.defaultContent.previewImageUrl : "";
      return (
        <div>
          <p>2. 選擇要上傳的圖片(非必要)</p>
          <FileBase64 multiple={ false } onDone={ this.handleFileChange.bind(this) } />
          <Image src={imageSrc} size='medium'>
            <Loader active={this.state.isuploading} inline />
          </Image>
          <div>3. 複製貼上 Bot Designer 產生的程式，<Label>altText</Label>輸入在不支援的裝置上要顯示的文字</div>
          <JSONInput
            id          = { this.props.id }
            placeholder = { placeholder }
            locale      = { locale }
            height      = '250px'
            onChange    = { handleJSONChange }
          />
        </div>
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
      { key: 'carousel', text: '輪播範本', value: 'carousel' },
      { key: 'flex', text: '自定義', value: 'flex' },
    ];

    return (
      <Segment raised>
        <Header as="h3">訊息#{this.props.idx+1}
          <Button floated='right' style={{color:'white', background:'#d32f2f'}} onClick={this.handleDeleteClicked}>刪除</Button>
        </Header>
        <Divider/>
        <p>1. 選擇要新增的訊息類別</p>
        <Dropdown placeholder='Select message type' options={msgTypeOptions} selection defaultValue={this.props.defaultContent.type} onChange={this.onTypeChange} style={{ width:"200px" }}></Dropdown>
        {renderContent()}
      </Segment>
		)
	}

}
