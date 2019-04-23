import React, { Component}  from 'react';
import packageJson from '../../package.json';
import axios from 'axios';
import { Header, Segment, Label, Loader, Popup, Button } from 'semantic-ui-react'

export default class VideoUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'video',
      file: {},
      fileUrl: '',
      isUploading: false
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

  handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("size:" + parseInt(file.size));

      this.setState({ 
        file: file,
        fileUrl: "",
        isUploading: true
      });

      //upload image, get url and preview url
      const post_url = packageJson.server + '/upload';

      const data = new FormData();
      data.append('file', file);

      axios.post(post_url, data, {
        headers:{
          'content-type': 'multipart/form-data'
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
        this.setState({ 
          isUploading: false
        });
      });

  }

  renderContent = () => {
    return (
      <div>
        <Label style={{marginTop: '8px', marginRight: '8px'}}>fileUrl</Label>{this.state.fileUrl}
      </div>
    )
  }

  render() {
    const { isUploading } = this.state;
    const renderContent = this.renderContent;
    const handleFileChange = this.handleFileChange;

    return (
      <div>
        <Header as="h1" style={{fontFamily: 'Noto Sans TC'}}>{this.props.title}</Header>
        <p style={{fontFamily: 'Noto Sans TC'}}>上傳影片給 Bot designer 使用</p>
        <Segment raised>
          <Segment.Group>
            <Segment>
              <Popup trigger={<Button icon='video' value='video' style={{background: this.state.type === 'video' ? 'lightgray' : 'white'}} />} content='影片' inverted/>
            </Segment>
            <Segment placeholder>
              <input type='file' onChange={handleFileChange} accept="video/mp4,video/x-m4v,video/*"/>
              <Loader active={isUploading}/>
            </Segment>
          </Segment.Group>
          {renderContent()}
        </Segment>
      </div>
    )
  }
}