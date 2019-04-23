import React, { Component}  from 'react';
import packageJson from '../../package.json';
import { Image, Header, Button, Segment, Loader, Icon } from 'semantic-ui-react'
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import FileBase64 from 'react-file-base64';
import axios from 'axios';

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
      isUploading: false
    };
  }

  onTypeChange = (event, data) => {
    this.setState({
      type: data.value
    },()=>{
      console.log(this.state.type);
    })
  }

  handleDeleteClicked = (e, { value }) => {
    this.props.deleteCallback(this.props.id, value);
  }

  handleJSONChange = (e) => {
    console.log("event" + JSON.stringify(e));
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
        isUploading: true
      });
      if(this.state.isSimpleIamge) {
        //upload image, get url and preview url
        const post_url = packageJson.server + '/image_msg_upload';
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
            isUploading: false
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
          this.setState({
            isUploading: false
          });
        });
      }
    } else {
      alert("檔案超過 1Mb!");
    }
  }

  renderContent = () => {
    const { type, isUploading } = this.state;
    const handleJSONChange = this.handleJSONChange;
    const placeholder = this.props.defaultContent.type === this.state.type ? this.props.defaultContent : {};

    if(type === 'image') {
      const imageSrc = this.state.file.hasOwnProperty("base64") ? this.state.file.base64 : this.props.defaultContent.hasOwnProperty("previewImageUrl") ? this.props.defaultContent.previewImageUrl : '';
      if(imageSrc === '') {
        //no image file
        return (
          <Segment placeholder>
            <Header icon>
              <Icon name='picture' />
              No images are listed for this customer.
            </Header>
            <FileBase64 multiple={ false } onDone={ this.handleFileChange.bind(this) } />
          </Segment>
        )
      } else {
        //has image file
        return (
          <Segment placeholder>
            {!isUploading && <Image src={imageSrc} size='medium'/>}
            {isUploading  && <Loader/>}
          </Segment>
        )
      }
    } else {
      return (
        <Segment placeholder>
          <p style={{fontFamily: 'Noto Sans TC', marginTop: '8px'}}>1. 使用 Bot Designer 設計好訊息</p>
          <p style={{fontFamily: 'Noto Sans TC', marginTop: '8px'}}>2. 複製貼上 Bot Designer 產生的程式</p>
          <JSONInput
            id          = { this.props.id }
            placeholder = { placeholder }
            locale      = { locale }
            height      = '150px'
            onChange    = { handleJSONChange }
          />
        </Segment>
      )
    }
  }

  renderMenu = () => {
    const onTypeChange = this.onTypeChange;

    return (
      <Segment>
        <Button icon='talk'    value='text'  style={{background: this.state.type === 'text' ? 'lightgray' : 'white'}} onClick={onTypeChange}/>
        <Button icon='picture' value='image' style={{background: this.state.type === 'image' ? 'lightgray' : 'white'}} onClick={onTypeChange}/>
        <Button icon='external square alternate' value='flex' style={{background: this.state.type === 'flex' ? 'lightgray' : 'white'}} onClick={onTypeChange}/>
        <Button icon='block layout' value='imagemap' style={{background: this.state.type === 'imagemap' ? 'lightgray' : 'white'}} onClick={onTypeChange}/>
        <Button icon='video'   value='video' style={{background: this.state.type === 'video' ? 'lightgray' : 'white'}} onClick={onTypeChange}/>
        <Button icon='music'   value='audio' style={{background: this.state.type === 'audio' ? 'lightgray' : 'white'}} onClick={onTypeChange}/>
        <Button icon='meh'     value='sticker' style={{background: this.state.type === 'sticker' ? 'lightgray' : 'white'}} onClick={onTypeChange}/>
        <Button icon='point'   value='location' style={{background: this.state.type === 'location' ? 'lightgray' : 'white'}} onClick={onTypeChange}/>
      </Segment>
    )
  }

	render() {
    const renderMenu = this.renderMenu;
    const renderContent = this.renderContent;

    return (
      <Segment raised>
        <Header as="h3" style={{fontFamily: 'Noto Sans TC'}}>訊息#{this.props.idx+1}
          <Button floated='right' style={{color:'white', background:'#d32f2f'}} onClick={this.handleDeleteClicked}>刪除</Button>
        </Header>
        <Segment.Group>
          {renderMenu()}
          {renderContent()}
        </Segment.Group>
      </Segment>
		)
	}

}
