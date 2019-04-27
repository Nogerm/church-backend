import React, { Component}  from 'react';
import packageJson from '../../package.json';
import googleConfig from '../google_config';
import axios from 'axios';
import { Header, Segment, Button, Label, Table, Loader } from 'semantic-ui-react';

const fakeData = {"kind":"analytics#gaData","id":"https://www.googleapis.com/analytics/v3/data/ga?ids=ga:193440673&dimensions=ga:pagePath,ga:date&metrics=ga:pageviews,ga:uniquePageviews&start-date=2019-03-26&end-date=2019-04-26","query":{"start-date":"2019-03-26","end-date":"2019-04-26","ids":"ga:193440673","dimensions":"ga:pagePath,ga:date","metrics":["ga:pageviews","ga:uniquePageviews"],"start-index":1,"max-results":1000},"itemsPerPage":1000,"totalResults":32,"selfLink":"https://www.googleapis.com/analytics/v3/data/ga?ids=ga:193440673&dimensions=ga:pagePath,ga:date&metrics=ga:pageviews,ga:uniquePageviews&start-date=2019-03-26&end-date=2019-04-26","profileInfo":{"profileId":"193440673","accountId":"138277882","webPropertyId":"UA-138277882-1","internalWebPropertyId":"198888686","profileName":"所有網站資料","tableId":"ga:193440673"},"containsSampledData":false,"columnHeaders":[{"name":"ga:pagePath","columnType":"DIMENSION","dataType":"STRING"},{"name":"ga:date","columnType":"DIMENSION","dataType":"STRING"},{"name":"ga:pageviews","columnType":"METRIC","dataType":"INTEGER"},{"name":"ga:uniquePageviews","columnType":"METRIC","dataType":"INTEGER"}],"totalsForAllResults":{"ga:pageviews":"178","ga:uniquePageviews":"43"},"rows":[["/homepage","20190417","34","4"],["/主日影音","20190413","7","1"],["/主日影音","20190415","7","1"],["/主日影音","20190416","6","1"],["/主日影音","20190417","2","1"],["/主日影音","20190418","2","1"],["/主日影音訊息","20190418","1","1"],["/主日影音訊息","20190419","1","1"],["/交通資訊","20190413","10","1"],["/交通資訊","20190415","12","1"],["/交通資訊","20190417","3","2"],["/交通資訊","20190418","2","1"],["/交通資訊","20190419","1","1"],["/今日聖言","20190413","2","1"],["/今日聖言","20190415","3","1"],["/今日聖言","20190418","1","1"],["/其他訊息","20190416","1","1"],["/其他訊息","20190418","6","5"],["/加入好友","20190413","2","1"],["/加入好友","20190415","9","1"],["/加入好友","20190423","2","1"],["/官網FB","20190413","7","1"],["/官網FB","20190415","12","1"],["/官網FB","20190418","1","1"],["/小組資訊","20190415","1","1"],["/後台登入","20190415","1","1"],["/後台登入","20190416","1","1"],["/聚會時間","20190413","12","1"],["/聚會時間","20190415","9","1"],["/聚會時間","20190417","16","3"],["/聚會時間","20190426","2","2"],["/週報訊鐔","20190413","2","1"]]};

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
