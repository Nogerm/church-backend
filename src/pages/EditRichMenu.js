import React, { Component}  from 'react';
import axios from 'axios';
import { Header, Segment, Divider, Button, Image } from 'semantic-ui-react';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import FileBase64 from 'react-file-base64';

const BASE_URL = "https://nogerm-demo-test.herokuapp.com/";

export default class EditRichMenu extends Component {

	constructor(props) {
    super(props);
    this.state = {
			menu: {},
			file: {},
			richmenuId: "",
			jsonEdited: false,
			fileOk: false,
			isUploading: false
    };
	}

	handleFileChange = (file) => {
		if(parseInt(file.size) < 1000) {
      //size OK
      this.setState({ 
				file: file,
				fileOk: true
			});
		} else {
			alert("檔案超過 1kb");
		}
	}

	handleJSONChange = (e) => {
		//console.log("event" + JSON.stringify(e));
		this.setState({
			menu: e.jsObject,
			jsonEdited: true
		});
	}

	createRichMenu = () => {
		this.setState({
			isUploading: true
		});
		const post_url = BASE_URL + 'create_rich_menu_for_all';
		const data = {
			menu: this.state.menu,
			file_base64: this.state.file.base64,
			file_size: this.state.file.size,
			file_type: this.state.file.type
		}
		axios.post(post_url, data, {
			headers:{
				'content-type': 'application/json'
			}
		})
		.then(response => {
			console.log("[createRichMenu] success");
			this.setState({
				isUploading: false
			});
			alert("修改圖文選單成功！");
		})
		.catch(error => {
			console.log("[createRichMenu] error" + error);
			this.setState({
				isUploading: false
			});
			alert("修改圖文選單失敗，錯誤：" + error);
		});
	}

	render() {
		const placeholder = {
			text: "複製貼上 Bot Designer 產生的程式"
    };
    const { jsonEdited, fileOk } = this.state;
    const createRichMenu = this.createRichMenu;
		const handleJSONChange = this.handleJSONChange;
		const imageSrc = this.state.file.hasOwnProperty("base64") ? this.state.file.base64 : "";
		return(
			<div>
				<Header as="h1"  style={{fontFamily: 'Noto Sans TC'}}>修改圖文選單</Header>
        <p style={{fontFamily: 'Noto Sans TC'}}>需配合 Bot designer 使用</p>
        <a href="https://developers.line.biz/en/services/bot-designer/" rel="noopener noreferrer" target="_blank" title="Bot designer 下載連結">Bot designer 下載連結</a>
        <br/>
				<Segment raised>
					<Header as="h3">圖文選單</Header>
					<Divider/>
        	<p>1. 使用 Bot designer 設計要用的圖文選單</p>
					<p>2. 複製貼上 Bot Designer 產生的程式</p>
					<JSONInput
            id          = { this.props.id }
            placeholder = { placeholder }
            locale      = { locale }
            height      = '300px'
            onChange    = { handleJSONChange }
          />
					<p>3. 選擇圖文選單的背景圖片（必須為 2500x1686 or 2500x843）</p>
					<div style={{marginLeft:'8px'}}>
						<FileBase64 multiple={ false } onDone={ this.handleFileChange.bind(this) } />
						<Image src={imageSrc} style={{width: '50vw'}}/>
					</div>
					<p>4. 儲存改動</p>
					<Button style={{color:'white', background:'#00B300', margin:'8px'}}  disabled={!jsonEdited || !fileOk} onClick={createRichMenu} loading={this.state.isUploading}>儲存</Button>
				</Segment>
			</div>
			
		)
	}
}