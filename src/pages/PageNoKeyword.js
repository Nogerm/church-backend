import React, { Component}  from 'react';
import packageJson from '../../package.json';
import { Header, Segment } from 'semantic-ui-react'
import axios from 'axios';
import EditReplies from './EditReplies';

export default class PageNoKeyword extends Component {

	constructor(props) {
    super(props);
    this.state = {
			messageArray: [],
			isLoading: false
    };
	}

	componentDidMount() {
		this.query_all_no_keyword();
	}
	
	query_all_no_keyword = () => {
		this.setState({
			isLoading: true
		});
		const url = packageJson.server + '/no_keyword';
		axios.get(url)
		.then(response => {
			console.log("[query_all_no_keyword] success" + JSON.stringify(response.data));
			this.setState({
				messageArray: response.data,
				isLoading: false
			});
		})
		.catch(error => {
			console.log("[query_all_no_keyword] error" + error);
		});
	}

	render() {
		return (
			<div>
				<Header as="h1" style={{fontFamily: 'Noto Sans TC'}}>{this.props.title}</Header>
				<Segment raised>
					<EditReplies />
        </Segment>
			</div>
		)
	}
}