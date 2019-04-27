import React, { Component}  from 'react';
import packageJson from '../../package.json';
import googleConfig from '../google_config';
import axios from 'axios';
import { Header, Segment, Button, Label, Table, Loader } from 'semantic-ui-react';

export default class Analytics extends Component {

	componentDidMount() {
		this.loadAndInitGAPI();
	}

	loadAndInitGAPI = () => {
		const handleAnalyticsData = this.handleAnalyticsData;
		return new Promise((resolve, reject) => {
			let script = document.createElement('script')
			script.type = 'text/javascript'
			script.src = 'https://apis.google.com/js/api.js'
			script.onload = e => {
				window.gapi.load('client', () => {
					console.log("Google client ready");

					//set API Key
					window.gapi.client.setApiKey(googleConfig.apiKey);

					//init auth
					window.gapi.auth2.init({
						clientId: googleConfig.clientId,
						discoveryDocs: googleConfig.discoveryDocs,
						scope: googleConfig.scope
					})
					.then(() => {
						console.log("Google Auth 2 inited");

						//sign in
						window.gapi.auth2.getAuthInstance().signIn()
						.then((...args) => {
							console.log("Google Auth 2 inited");

							//set access_token
							window.gapi.client.setToken({access_token: args[0].Zi.access_token});

							//load analytics API
							window.gapi.client.load('analytics', 'v3', () => {
								console.log("Analytics API ready");

								//request analytics data
								window.gapi.client
								.request({
									path:
										"https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A193440673&start-date=2019-03-26&end-date=2019-04-26&metrics=ga%3Apageviews%2Cga%3AuniquePageviews&dimensions=ga%3ApagePath%2Cga%3Adate"
								})
								.then((...data) => {
									console.log("Analytics data: " +data);

									handleAnalyticsData(data);
								});
							});
						});
					});
				});
			}
			document.getElementsByTagName('head')[0].appendChild(script)
		})
	}

	handleAnalyticsData = (dataArray) => {
		//parse data
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
