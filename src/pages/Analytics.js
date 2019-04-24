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
						discoveryDocs: googleConfig.discoveryDocs,
						clientId: googleConfig.clientId,
						scope: googleConfig.scope
					})
					.then(() => {
					// 3. Initialize and make the API request.
					// Listen for sign-in state changes.
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

          // Handle the initial sign-in state.
          this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());

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

	updateSigninStatus = (isSignedIn) => {
		// When signin status changes, this function is called.
		// If the signin status is changed to signedIn, we make an API call.
		if (isSignedIn) {
			this.makeApiCall();
		}
	}

	makeApiCall = () => {
		// Make an API call to the People API, and print the user's given name.
		window.gapi.client.people.people.get({
			'resourceName': 'people/me',
			'requestMask.includeField': 'person.names'
		}).then(function(response) {
			console.log('Hello, ' + response.result.names[0].givenName);
		}, function(reason) {
			console.log('Error: ' + reason.result.error.message);
		});
	}


	render() {
		return (
			<div>
				<Header as="h1" style={{fontFamily: 'Noto Sans TC'}}>{this.props.title}</Header>
				<a href="https://analytics.google.com/analytics/web/#/report-home/a138277882w198888686p193440673" rel="noopener noreferrer" target="_blank" title="Google Analytics">Google Analytics</a>
			</div>
		)
	}
}
