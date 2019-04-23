import React, { Component}  from 'react';
import packageJson from '../../package.json';
import axios from 'axios';
import { Header, Segment, Image, Loader, Popup, Button, Label } from 'semantic-ui-react'
import FileBase64 from 'react-file-base64';

export default class ImageUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: "single",
      file: {},
      fileUrl: '',
      filePreviewUrl: '',
      baseUrl: '',
      thumbHeight: '',
      isUploading: false
    };
  }

  onTypeChange = (event, data) => {
    this.setState({
      type: data.value,
      file: {},
      fileUrl: '',
      filePreviewUrl: '',
      baseUrl: '',
      thumbHeight: ''
    },()=>{
      console.log(this.state.type);
    })
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
        isUploading: true
      });
      if(this.state.type === 'single') {
        //upload image, get url and preview url
        const post_url = packageJson.server + '/image_upload';
        const data = {
          binary: file.base64,
          folder_name: 'image_single'
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
            isUploading: false
          });
        })
        .catch(error => {
          console.log("[sendUpdateRequest] error" + error);
          alert("檔案上傳失敗，錯誤訊息：" + error);
        });
      } else if(this.state.type === 'image') {
        //upload image, get url and preview url
        const post_url = packageJson.server + '/image_msg_upload';
        const data = {
          binary: file.base64,
          folder_name: 'image_message'
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
            isUploading: false
          });
        })
        .catch(error => {
          console.log("[sendUpdateRequest] error" + error);
          alert("檔案上傳失敗，錯誤訊息：" + error);
        });
      } else if(this.state.type === 'imagemap') {
        //upload image, get base url
        const post_url = packageJson.server + '/imagemap_image_upload';
        const data = {
          binary: file.base64,
          folder_name: 'image_imagemap'
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
            baseUrl: response.data.file_base_url,
            thumbHeight: response.data.thumb_height,
            isUploading: false
          });
        })
        .catch(error => {
          console.log("[sendUpdateRequest] error" + error);
          alert("檔案上傳失敗，錯誤訊息：" + error);
        });
      }
    }
  }

  renderResult = () => {
    const { type } = this.state;

    if(type === 'single') {
      return (
        <div>
          <Label style={{marginTop: '8px', marginRight: '8px'}}>fileUrl</Label>{this.state.fileUrl}
        </div>
      )
    } else if (type === 'image') {
      return (
        <div>
          <div><Label style={{marginTop: '8px', marginRight: '8px'}}>fileUrl</Label>{this.state.fileUrl}</div>
          <div><Label style={{marginTop: '8px', marginRight: '8px'}}>filePreviewUrl</Label>{this.state.filePreviewUrl}</div>
        </div>
      )
    } else if (type === 'imagemap') {
      return (
        <div>
          <Label style={{marginTop: '8px', marginRight: '8px'}}>baseUrl</Label>{this.state.baseUrl}
        </div>
      )
    }
  }

  renderContent = () => {
    const imageSrc = this.state.file.hasOwnProperty("base64") ? this.state.file.base64 : "";
    const { isUploading } = this.state;
    const handleFileChange = this.handleFileChange;

    if(imageSrc === '') {
      //no image file
      return (
        <Segment placeholder>
          <FileBase64 multiple={ false } onDone={handleFileChange}  style={{margin: 'auto'}}/>
        </Segment>
      )
    } else {
      //has image file
      return (
        <Segment placeholder>
          <Image src={imageSrc} size='medium'>
          </Image>
          <Loader active={isUploading}/>
        </Segment>
      )
    }
  }

  renderMenu = () => {
    const onTypeChange = this.onTypeChange;

    return (
      <Segment>
        <Popup trigger={<Button icon='image'    value='single'  style={{background: this.state.type === 'single' ? 'lightgray' : 'white'}} onClick={onTypeChange}/>} content='單張圖片' inverted/>
        <Popup trigger={<Button icon='images'   value='image' style={{background: this.state.type === 'image' ? 'lightgray' : 'white'}} onClick={onTypeChange}/>} content='圖片訊息' inverted/>
        <Popup trigger={<Button icon='block layout' value='imagemap' style={{background: this.state.type === 'imagemap' ? 'lightgray' : 'white'}} onClick={onTypeChange}/>} content='影像地圖' inverted/>
      </Segment>
    )
  }

  render() {
    const renderMenu = this.renderMenu;
    const renderContent = this.renderContent;
    const renderResult = this.renderResult;

    return (
      <div>
        <Header as="h1" style={{fontFamily: 'Noto Sans TC'}}>{this.props.title}</Header>
        <p style={{fontFamily: 'Noto Sans TC'}}>上傳圖片給 Bot designer 使用</p>
        <Segment raised>
          <Segment.Group>
            {renderMenu()}
            {renderContent()}
          </Segment.Group>
          {renderResult()}
        </Segment>
      </div>
    )
  }
}