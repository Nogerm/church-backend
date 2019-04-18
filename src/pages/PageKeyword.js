import React, { Component}  from 'react';
import packageJson from '../../package.json';
import { Grid, Menu, Image, Header, Button, Segment, Loader, Table, Input } from 'semantic-ui-react'
import axios from 'axios';

export default class PageKeyword extends Component {

	constructor(props) {
    super(props);
    this.state = {
      keywordsArray: [{_id: "123", label: "沒有關鍵字", value: "沒有關鍵字"}]
    };
	}

	componentDidMount() {
		this.query_all_keyword();
	}
	
	query_all_keyword = () => {
		const url = packageJson.server + '/keywords';
		axios.get(url)
		.then(response => {
			console.log("[query_all_keyword] success" + JSON.stringify(response.data));
			this.setState({
				keywordsArray: response.data
			});
		})
		.catch(error => {
			console.log("[query_all_keyword] error" + error);
		});
	}

	keyword_add = () => {
		const url = packageJson.server + '/keywords';
		const data = {
			label: "123",
			value: "456"
		}
		axios.post(url, data, {
			headers:{
				'content-type': 'application/json'
			}
		})
		.then(response => {
			console.log("[keyword_add] success");
		})
		.catch(error => {
			console.log("[keyword_add] error" + error);
		});
	}

	keyword_remove = (keyword_id) => {
		const query_all_keyword = this.query_all_keyword;

		console.log("[keyword_remove] id: " + keyword_id);
		const url = packageJson.server + '/delete_keywords';
		const data = {
			id: keyword_id
		}
		axios.post(url, data, { 
      headers:{
				'content-type': 'application/json'
			}
    })
    .then(function (response) {
			console.log("[keyword_remove] success" + response.data);
			query_all_keyword();
    })
    .catch(function (err) {
      console.log("[keyword_remove] fail" + err);
    });
	}

	render() {
		const { keywordsArray } = this.state;
		const keyword_remove = this.keyword_remove;
		return (
			<div>
				<Header as="h1" style={{fontFamily: 'Noto Sans TC'}}>{this.props.title}</Header>
				<Segment>
				<Button floated='right' style={{color:'white', background:'#00B300'}} onClick={this.keyword_add}>新增</Button>
					<Table>
						<Table.Header>
								<Table.Row>
									<Table.HeaderCell singleLine style={{fontFamily: 'Noto Sans TC'}}>關鍵字顯示名稱</Table.HeaderCell>
									<Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}}>關鍵字訊息</Table.HeaderCell>
									<Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}}>操作</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{keywordsArray.map(function(keyword, index){
									return (
										<Table.Row key={keyword._id}>
											<Table.Cell singleLine style={{fontFamily: 'Noto Sans TC'}}>{keyword.label}</Table.Cell>
											<Table.Cell singleLine style={{fontFamily: 'Noto Sans TC'}}>{keyword.value}</Table.Cell>
											<Table.Cell textAlign='center'>
												<Button floated='right' style={{color:'white', background:'#d32f2f'}} onClick={() => keyword_remove(keyword._id)}>刪除</Button>
											</Table.Cell>
										</Table.Row>
									)
								})}
							</Table.Body>

							<Table.Footer>
								<Table.Row>
        					<Table.HeaderCell colSpan='3'>
										<Input placeholder='Search...' />
										<Input placeholder='Search...' />
										<Button floated='right' style={{color:'white', background:'#00B300'}} onClick={this.keyword_add}>新增</Button>
									</Table.HeaderCell>
								</Table.Row>
							</Table.Footer>
					</Table>
				</Segment>
			</div>
		)
	}
}