import React, { Component}  from 'react';
import axios from 'axios';
import { Header, Segment, Divider } from 'semantic-ui-react';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';

export default class EditRichMenu extends Component {

	handleJSONChange = (e) => {
    //console.log("event" + JSON.stringify(e));
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
            height      = '100px'
            onChange    = { handleJSONChange }
          />
					<p>3. 選擇圖文選單的背景圖片（必須為 2500x1686 or 2500x843）</p>
				</Segment>
			</div>
			
		)
	}
}