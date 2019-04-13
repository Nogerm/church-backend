import React, { Component}  from 'react';
import packageJson from '../../package.json';
import axios from 'axios';
import { Header, Segment, Label, Dropdown, Image, Loader } from 'semantic-ui-react'
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
      isuploading: false
    };
  }

  onTypeChange = (e, { value }) => {
    this.setState({
      type: value,
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
        isuploading: true
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
            isuploading: false
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
            isuploading: false
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
            isuploading: false
          });
        })
        .catch(error => {
          console.log("[sendUpdateRequest] error" + error);
          alert("檔案上傳失敗，錯誤訊息：" + error);
        });
      }
    }
  }

  renderContent = () => {
    if(this.state.type === "single") {
      return (
        <div>
          <Label style={{marginTop: '8px', marginRight: '8px'}}>fileUrl</Label>{this.state.fileUrl}
        </div>
      )
    } else if(this.state.type === "image") {
      return (
        <div>
          <div><Label style={{marginTop: '8px', marginRight: '8px'}}>fileUrl</Label>{this.state.fileUrl}</div>
          <div><Label style={{marginTop: '8px', marginRight: '8px'}}>filePreviewUrl</Label>{this.state.filePreviewUrl}</div>
        </div>
      )
    } else if(this.state.type === "imagemap") {
      return (
        <div>
          <Label style={{marginTop: '8px', marginRight: '8px'}}>baseUrl</Label>{this.state.baseUrl}
        </div>
      )
    }
  }

  render() {
    const imageSrc = this.state.file.hasOwnProperty("base64") ? this.state.file.base64 : "";
    const renderContent = this.renderContent;
    const msgTypeOptions = [
      { key: 'single',   text: '單張圖片',    value: 'single' },
      { key: 'image',    text: '圖片訊息',    value: 'image' },
      { key: 'imagemap', text: '影像地圖',    value: 'imagemap' },
    ];

    return (
      <div>
        <Header as="h1" style={{fontFamily: 'Noto Sans TC'}}>{this.props.title}</Header>
        <p style={{fontFamily: 'Noto Sans TC'}}>上傳圖片給 Bot designer 使用</p>
        <Segment raised>
          <p>1. 選擇上傳類別</p>
          <Dropdown placeholder='Select message type' options={msgTypeOptions} selection defaultValue={this.state.type} onChange={this.onTypeChange} style={{ width:"200px" }}></Dropdown>
          <p>2. 選擇要上傳的圖片</p>
          <FileBase64 multiple={ false } onDone={ this.handleFileChange.bind(this) } />
          <Image src={imageSrc} size='medium'>
            <Loader active={this.state.isuploading} inline />
          </Image>
          {renderContent()}
        </Segment>
      </div>
    )
  }
}