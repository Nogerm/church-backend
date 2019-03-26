import React, { Component}  from 'react';
import axios from 'axios';
import { Header, Segment, Divider } from 'semantic-ui-react';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import FileBase64 from 'react-file-base64';

const BASE_URL = "https://nogerm-demo-test.herokuapp.com/";

export default class EditRichMenu extends Component {

	constructor(props) {
    super(props);
    this.state = {
			menu: {},
      file: {}
    };
	}

	handleFileChange = (file) => {
		if(parseInt(file.size) < 1000) {
      //size OK
      this.setState({ 
        file: file
			});
			const post_url = BASE_URL + 'create_rich_menu_for_all';
      const headers = {
        'content-type': 'application/json'
      }
      const data = {
				menu: this.state.menu,
        binary: file.base64
      }
      axios.post(post_url, data, headers)
      .then(response => {
        console.log("[handleFileChange] success");
        alert("檔案上傳成功！");
      })
      .catch(error => {
        console.log("[handleFileChange] error" + error);
        alert("檔案上傳失敗，錯誤訊息：" + error);
      });
		}
	}

	handleJSONChange = (e) => {
		//console.log("event" + JSON.stringify(e));
		this.setState({
			menu: e.jsObject
		});
  }

	render() {
		const placeholder = {
			text: "複製貼上 Bot Designer 產生的程式"
		};
		const handleJSONChange = this.handleJSONChange;
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
					<FileBase64 multiple={ false } onDone={ this.handleFileChange.bind(this) } />
				</Segment>
			</div>
			
		)
	}
}