import React, { Component}  from 'react';
import axios from 'axios';
import { Header, Segment, Divider, Button } from 'semantic-ui-react';
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
			fileOk: false
    };
	}

	handleFileChange = (file) => {
		if(parseInt(file.size) < 1000) {
      //size OK
      this.setState({ 
				file: file,
				fileOk: true
			});
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
		const post_url = BASE_URL + 'create_rich_menu_for_all';
		const data = {
			menu: this.state.menu,
			binary: this.state.file.base64,
			binary_size: this.state.file.size
		}
		axios.post(post_url, data, {
			headers:{
				'content-type': 'application/json'
			}
		})
		.then(response => {
			console.log("[createRichMenu] success");
		})
		.catch(error => {
			console.log("[createRichMenu] error" + error);
		});
	}

	render() {
		const { jsonEdited, fileOk } = this.state;
		const placeholder = {
			text: "複製貼上 Bot Designer 產生的程式"
		};
		const handleJSONChange = this.handleJSONChange;
		const createRichMenu = this.createRichMenu;
		return(
			<div>
				<Header as="h1"  style={{fontFamily: 'Noto Sans TC'}}>編輯圖文選單</Header>
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
					</div>
					<p>4. 儲存改動</p>
					<div>
						<Button style={{color:'white', background:'#00B300', margin:'8px'}}  disabled={!jsonEdited || !fileOk} onClick={createRichMenu}>儲存</Button>
					</div>
				</Segment>
			</div>
			
		)
	}
}