import React, { Component}  from 'react';
import packageJson from '../../package.json';
import { Header, Button, Segment, Table, Input, Form, Loader, Modal, Confirm } from 'semantic-ui-react'
import axios from 'axios';
import EditReplies from './EditReplies';

export default class PageKeyword extends Component {

	constructor(props) {
    super(props);
    this.state = {
			keywordsArray: [],
			newKeywordLabel: "",
			newKeywordValue: "",
      isDeleting: false,
			selectedKeyword: {},
			isLoading: false,
			showModal: false,
			showConfirm: false,
			keywordEdited: false
    };
	}

	componentDidMount() {
		this.query_all_keyword();
	}
	
	query_all_keyword = () => {
		this.setState({
			isLoading: true
		});
		const url = packageJson.server + '/keywords';
		axios.get(url)
		.then(response => {
			console.log("[query_all_keyword] success" + JSON.stringify(response.data));
			this.setState({
				keywordsArray: response.data,
				isLoading: false
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
			value: this.state.newKeywordValue,
			messages: []
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

	keyword_edit = (keyword) => {
		keyword.isEdited = false
		this.setState({ 
			selectedKeyword: keyword,
			showModal: true
		});
	}

	keyword_edit_close = () => {
		const { selectedKeyword } = this.state;
		console.log("isEdited"+selectedKeyword.isEdited);
		if(selectedKeyword.isEdited) {
			//edited, show confirm
			this.setState({
				showConfirm: true
			});
		} else {
			//not edit, close modal
			this.setState({
				selectedKeyword: {},
				showModal: false
			});
		}
	}

	handle_keyword_edited = (isEdited, msg) => {
		const { selectedKeyword } = this.state;
		selectedKeyword.isEdited = isEdited
	}

	handleCancelAbort = () => {
		this.setState({
			showConfirm: false
		});
	}

	handleConfirmAbort = () => {
		this.setState({
			showConfirm: false,
			showModal: false
		});
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

	renderModal = (keyword) => {
		const { showModal, selectedKeyword } = this.state;
		const keyword_edit_close = this.keyword_edit_close;
		const handle_keyword_edited = this.handle_keyword_edited;
		if(showModal) {
			return (
				<Modal centered={false} closeOnDimmerClick={false} open={showModal}>
					<Modal.Content>
						<Button floated='right' color='google plus' onClick={keyword_edit_close}>X</Button>
						<EditReplies keyword={selectedKeyword} editCallback={handle_keyword_edited}/>
					</Modal.Content>
				</Modal>
			)
		}
	}
	
	renderConfirm = () => {
		const { showConfirm } = this.state;
		const handleCancelAbort = this.handleCancelAbort;
		const handleConfirmAbort = this.handleConfirmAbort;
		if(showConfirm) {
			return (
				<Confirm open={showConfirm} content='要捨棄未儲存的變更嗎？' cancelButton='取消' confirmButton="確定" onCancel={handleCancelAbort} onConfirm={handleConfirmAbort} />
			)
		}
	}

	render() {
		const { keywordsArray, newKeywordLabel, newKeywordValue, isLoading } = this.state;
		const keyword_remove = this.keyword_remove;
		const handleLabelChange = this.handleLabelChange;
		const handleValueChange = this.handleValueChange;
		const keyword_edit = this.keyword_edit;
		const renderModal = this.renderModal;
		const renderConfirm = this.renderConfirm;
		return (
			<div>
				<Header as="h1" style={{fontFamily: 'Noto Sans TC'}}>{this.props.title}</Header>
				<Segment raised>
					<Table>
						<Table.Header>
								<Table.Row>
									<Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}} width='6'>標題</Table.HeaderCell>
									<Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}} width='6'>關鍵字</Table.HeaderCell>
									<Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}} width='4'>操作</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{isLoading && <Table.Row>
										<Table.Cell colSpan='5'>
											<Loader active inline='centered' />
										</Table.Cell>
									</Table.Row>
								}
								{keywordsArray.map(function(keyword, index){
									return (
										<Table.Row key={keyword._id}>
											<Table.Cell singleLine style={{fontFamily: 'Noto Sans TC'}}>{keyword.label}</Table.Cell>
											<Table.Cell singleLine style={{fontFamily: 'Noto Sans TC'}}>{keyword.value}</Table.Cell>
											<Table.Cell textAlign='center'>
												<Button floated='right' color='google plus' onClick={() => keyword_remove(keyword._id)}>刪除</Button>
												<Button floated='right' color='vk' onClick={() => keyword_edit(keyword)}>編輯回應</Button>
												{renderModal(keyword)}
												{renderConfirm()}
											</Table.Cell>
										</Table.Row>
									)
								})}
							</Table.Body>

							<Table.Footer>
								<Table.Row>
									<Table.HeaderCell colSpan='3'>
										<Form onSubmit={this.keyword_add}>
											<Form.Group>
												<Form.Field
													control={Input}
													label='標題'
													placeholder='標題'
													value={newKeywordLabel}
													onChange={handleLabelChange}
													width='7'
												/>
												<Form.Field
													control={Input}
													label='關鍵字'
													placeholder='關鍵字'
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
													fluid
												/>
											</Form.Group>
										</Form>
									</Table.HeaderCell>
								</Table.Row>
							</Table.Footer>
					</Table>
				</Segment>
			</div>
		)
	}
}