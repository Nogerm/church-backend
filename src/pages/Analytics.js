import React, { Component}  from 'react';
import packageJson from '../../package.json';
import googleConfig from '../google_config';
import axios from 'axios';
import { Header, Segment, Button, Label, Table, Loader } from 'semantic-ui-react';

export default class Analytics extends Component {

	componentDidMount() {
		// 1. Load the JavaScript client library.
		window.gapi.load('client', {
			callback: function() {
				// Handle gapi.client initialization.
				// 2. Initialize the JavaScript client library.
				window.gapi.client
					.init({
						apiKey: googleConfig.apiKey,
						// Your API key will be automatically added to the Discovery Document URLs.
						discoveryDocs: googleConfig.discoveryDocs
					})
					.then(() => {
					// 3. Initialize and make the API request.
				});
			},
			onerror: function() {
				// Handle loading error.
				alert('gapi.client failed to load!');
			},
			timeout: 5000, // 5 seconds.
			ontimeout: function() {
				// Handle timeout.
				alert('gapi.client could not load in a timely manner!');
			}
		});
	}

	render() {
		return (
			<div>
				<Header as="h1" style={{fontFamily: 'Noto Sans TC'}}>{this.props.title}</Header>
				<p>Analytics</p>
			</div>
		)
	}
}
