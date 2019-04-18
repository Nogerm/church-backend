import React, { Component}  from 'react';
import packageJson from '../../package.json';
import { Grid, Menu, Image, Header, Button, Segment, Loader, Table, Input, Form, Transition } from 'semantic-ui-react'
import axios from 'axios';

export default class PageKeyword extends Component {

	constructor(props) {
    super(props);
    this.state = {
			keywordsArray: [{_id: "123", label: "沒有關鍵字", value: "沒有關鍵字"}],
			newKeywordLabel: "",
			newKeywordValue: "",
      isDeleting: false,
      modalVisible: false
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
		const query_all_keyword = this.query_all_keyword;

		const url = packageJson.server + '/keywords';
		const data = {
			label: this.state.newKeywordLabel,
			value: this.state.newKeywordValue
		}
		axios.post(url, data, {
			headers:{
				'content-type': 'application/json'
			}
		})
		.then(response => {
			console.log("[keyword_add] success");
			query_all_keyword();
			this.setState({
				newKeywordLabel: "",
				newKeywordValue: ""
			});
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

	keyword_edit = (keyword_id) => {

	}

	handleLabelChange = (e, { value }) => {
		this.setState({
			newKeywordLabel: value
		});
	}

	handleValueChange = (e, { value }) => {
		this.setState({
			newKeywordValue: value
		});
  }
  
  handleVisibility = () => this.setState({ modalVisible: !this.state.modalVisible })

	render() {
		const { keywordsArray, newKeywordLabel, newKeywordValue, modalVisible } = this.state;
		const keyword_remove = this.keyword_remove;
		const keyword_edit = this.keyword_edit;
		const handleLabelChange = this.handleLabelChange;
    const handleValueChange = this.handleValueChange;
    const handleVisibility = this.handleVisibility;
		return (
			<div>
				<Header as="h1" style={{fontFamily: 'Noto Sans TC'}}>{this.props.title}</Header>
				<Transition.Group animation='fly right' duration={500}>
        {!modalVisible && <Segment raised>
					<Table>
						<Table.Header>
								<Table.Row>
									<Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}} width='6'>關鍵字顯示名稱</Table.HeaderCell>
									<Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}} width='6'>關鍵字內容</Table.HeaderCell>
									<Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}} width='4'>操作</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{keywordsArray.map(function(keyword, index){
									return (
										<Table.Row key={keyword._id}>
											<Table.Cell singleLine style={{fontFamily: 'Noto Sans TC'}}>{keyword.label}</Table.Cell>
											<Table.Cell singleLine style={{fontFamily: 'Noto Sans TC'}}>{keyword.value}</Table.Cell>
											<Table.Cell textAlign='center'>
												<Button floated='right' color='google plus' onClick={() => keyword_remove(keyword._id)}>刪除</Button>
												<Button floated='right' color='vk' onClick={handleVisibility}>編輯回應</Button>
											</Table.Cell>
										</Table.Row>
									)
								})}
							</Table.Body>

							<Table.Footer>
								<Table.Row>
        					<Table.HeaderCell colSpan='4'>
										<Form onSubmit={this.keyword_add}>
											<Form.Group>
												<Form.Field
													control={Input}
													label='關鍵字顯示名稱'
													placeholder='關鍵字顯示名稱'
													value={newKeywordLabel}
													onChange={handleLabelChange}
													width='7'
												/>
												<Form.Field
													control={Input}
													label='關鍵字內容'
													placeholder='關鍵字內容'
													value={newKeywordValue}
													onChange={handleValueChange}
													width='7'
												/>
												<Form.Field
													control={Button}
													content='新增'
													label='儲存新的關鍵字'
													style={{color:'white', background:'#00B300'}}
													width='2'
													floated='right'
												/>
											</Form.Group>
										</Form>
									</Table.HeaderCell>
								</Table.Row>
							</Table.Footer>
					</Table>
				</Segment>
        }
        </Transition.Group>

				<Transition.Group animation='fly left' duration={500}>
          {modalVisible && <Segment raised>
            <Button floated='right' color='vk' onClick={handleVisibility}>X</Button>
            </Segment>
          }
				</Transition.Group>

			</div>
		)
	}
}