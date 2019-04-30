import React, { Component}  from 'react';
import googleConfig from '../google_config';
import { Header, Segment, Button, Label, Table, Loader } from 'semantic-ui-react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


export default class Analytics extends Component {

	constructor(props) {
    super(props);
    this.state = {
			queryData: {},
			chartData: [],
			xAxis: [],
			duration: 28,
			total: 0,
			countType: 'pageviews',
			isLoading: false
    };
  }

	componentDidMount() {
		this.loadAndInitGAPI();
	}

	loadAndInitGAPI = () => {
		const queryAnalyticsData = this.queryAnalyticsData;
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
								queryAnalyticsData();
							});
						});
					});
				});
			}
			document.getElementsByTagName('head')[0].appendChild(script)
		})
	}

	queryAnalyticsData = () => {
		const { duration } = this.state;
		const getDateString = this.getDateString;
		const handleAnalyticsData = this.handleAnalyticsData;
		const dataStartDate = new Date(new Date().setDate(new Date().getDate() - duration));
		const dataEndDate   = new Date();
		const queryPath     = "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A193440673&start-date=" + getDateString(dataStartDate) + "&end-date=" + getDateString(dataEndDate) + "&metrics=ga%3Apageviews%2Cga%3AuniquePageviews&dimensions=ga%3ApagePath%2Cga%3Adate"
		this.setState({
			isLoading: true
		});
		window.gapi.client
		.request({
			path: queryPath
		})
		.then((...data) => {
			console.log("Analytics data: " + JSON.stringify(data));
			this.setState({
				queryData: data[0].result,
				isLoading: false
			}, () => {
				handleAnalyticsData(data[0].result, dataStartDate);
			});
		});
	}

	getDateString = (date) => {
		return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
	}

	getDataIdxFromString = (dateString) => {
		const { duration } = this.state;
		const year      = parseInt(dateString.substring(0, 4));
		const month     = parseInt(dateString.substring(4, 6));
		const date      = parseInt(dateString.substring(6, 8));
		const dateObj   = new Date(year, month, date);
		const dataStartDate = new Date(new Date().setDate(new Date().getDate() - duration));
		const startDate = new Date(dataStartDate.getFullYear(), dataStartDate.getMonth() + 1, dataStartDate.getDate());
		const diff      = (dateObj - startDate) / (1000 * 60 * 60 * 24);
		console.log("diff: " + diff);
		return diff;
	}

	setXAxisLabel = () => {
		const { duration } = this.state;
		const dataStartDate = new Date(new Date().setDate(new Date().getDate() - duration));
		let newXAxis = [];
		for(let idx = 0; idx < this.state.duration; idx++) {
			const newDate = new Date(new Date().setDate(dataStartDate.getDate() + idx));
			const dateStr = newDate.getFullYear().toString() + '/' + (newDate.getMonth() + 1).toString() + '/' + newDate.getDate().toString();
			newXAxis.push(dateStr);
		}
		this.setState({
			xAxis: newXAxis
		});
	}

	handleAnalyticsData = (data) => {
		const { duration, countType } = this.state;
		const getDataIdxFromString = this.getDataIdxFromString;
		const setXAxisLabel = this.setXAxisLabel;
		const getTotalNum = this.getTotalNum;

		if(data.hasOwnProperty('rows')) {
			const dataArray = data.rows;
			console.log("data array: " + JSON.stringify(dataArray));
			setXAxisLabel();
			getTotalNum();

			let newDataArray = [];

			dataArray.forEach(function(data, index){
				console.log("data: " + JSON.stringify(data));
				const seriesName = data[0];
				const dataDate   = data[1];
				const dataValue  = countType === 'pageviews' ? parseInt(data[2]) : parseInt(data[3]);
	
				const findResult = newDataArray.findIndex((series) => series.name === seriesName);
				if(findResult === -1) {
					//not found, create series
					console.log("series not found, create one");
					let newSeries = {};
					newSeries.name = seriesName;
					newSeries.data = new Array(duration).fill(0);
					newDataArray = [...newDataArray, newSeries];
				} else {
					console.log("series found");
				}

				const dateIndex = getDataIdxFromString(dataDate);
				const seriesIndex = newDataArray.findIndex((series) => series.name === seriesName);
				if(seriesIndex === -1) {
					//series not found
					console.log("series not found...");
				} else {
					newDataArray[seriesIndex].data[dateIndex] = dataValue;
				}
			});

			this.setState({
				chartData: newDataArray
			});
		} else {
			alert("沒有資料");
		}
	}

	handleDurationChange = (event, data) => {
		const queryAnalyticsData = this.queryAnalyticsData;
		this.setState({
			queryData: {},
			chartData: [],
			duration: data.value
		}, () => {
			queryAnalyticsData();
		});
	}

	handleCountTypeChange = (event, data) => {
		const { queryData, duration } = this.state;
		const handleAnalyticsData = this.handleAnalyticsData;
		const dataStartDate = new Date(new Date().setDate(new Date().getDate() - duration));
		this.setState({
			chartData: [],
			countType: data.value
		}, () => {
			handleAnalyticsData(queryData, dataStartDate);
		});
	}

	getTitle = () => {
		return (this.state.countType === 'pageviews' ? '總瀏覽量' : '不重複瀏覽量');
	}

	getTotalNum = () => {
		const { queryData, total } = this.state;
		if(queryData.hasOwnProperty('totalsForAllResults')) {
			this.setState({
				total: this.state.countType === 'pageviews' ? queryData.totalsForAllResults["ga:pageviews"] : queryData.totalsForAllResults['ga:uniquePageviews']
			});
		}
		return total.toString();
	}

	render() {
		const { chartData, duration, countType, isLoading, xAxis, total } = this.state; 
		const handleDurationChange = this.handleDurationChange;
		const handleCountTypeChange = this.handleCountTypeChange;
		const getTitle = this.getTitle;
		const options = {
			chart: {
				type: 'line'
			},
			title: {
				text: 'LINE@ 流量統計'
			},
			xAxis: {
				categories: xAxis,
			},
			series: chartData
		};
		const add = (accumulator, a) => {
			return accumulator + a;
		}

		return (
			<div>
				<Header as="h1" style={{fontFamily: 'Noto Sans TC'}}>{this.props.title}</Header>
				<a href="https://analytics.google.com/analytics/web/#/report-home/a138277882w198888686p193440673" rel="noopener noreferrer" target="_blank" title="Google Analytics">Google Analytics</a>
				<Segment raised>
					<Button.Group>
						<Button style={{background: countType === 'pageviews' ? '#00B300' : 'lightgray', color: countType === 'pageviews' ? 'white' : 'gray', fontWeight: 'normal'}} value='pageviews' onClick={handleCountTypeChange} >總瀏覽量</Button>
						<Button.Or />
						<Button style={{background: countType === 'uniquePageviews' ? '#00B300' : 'lightgray', color: countType === 'uniquePageviews' ? 'white' : 'gray', fontWeight: 'normal'}} value='uniquePageviews' onClick={handleCountTypeChange} >不重複瀏覽量</Button>
					</Button.Group>
					<Button.Group style={{float: 'right'}}>
						<Button style={{background: duration === 1  ? '#00B300' : 'lightgray', color: duration === 1  ? 'white' : 'gray', fontWeight: 'normal'}} value={1}  onClick={handleDurationChange} >天</Button>
						<Button style={{background: duration === 7  ? '#00B300' : 'lightgray', color: duration === 7  ? 'white' : 'gray', fontWeight: 'normal'}} value={7}  onClick={handleDurationChange} >週</Button>
						<Button style={{background: duration === 28 ? '#00B300' : 'lightgray', color: duration === 28 ? 'white' : 'gray', fontWeight: 'normal'}} value={28} onClick={handleDurationChange} >月</Button>
					</Button.Group>
					<HighchartsReact highcharts={Highcharts} options={options} />
					<Table>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}} >功能</Table.HeaderCell>
								<Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}} >{getTitle()}</Table.HeaderCell>
								<Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}} >百分比</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{isLoading && <Table.Row>
								<Table.Cell colSpan='2'>
									<Loader active inline='centered' />
								</Table.Cell>
							</Table.Row>
							}
							{!isLoading && <Table.Row>
								<Table.Cell singleLine ></Table.Cell>
								<Table.Cell style={{fontFamily: 'Noto Sans TC'}}>
									<Header>{total}</Header>
									<Header.Subheader>時間內的總瀏覽量</Header.Subheader>
								</Table.Cell>
								<Table.Cell style={{fontFamily: 'Noto Sans TC'}}>
									<Header>100.00%</Header>
									<Header.Subheader>總百分比</Header.Subheader>
								</Table.Cell>
							</Table.Row>}
							{chartData.map(function(series, index){
								const sum = series.data.reduce(add);
								return (
									<Table.Row key={index}>
										<Table.Cell singleLine style={{fontFamily: 'Noto Sans TC'}}>{series.name}</Table.Cell>
										<Table.Cell singleLine style={{fontFamily: 'Noto Sans TC'}}>{sum}</Table.Cell>
										<Table.Cell singleLine style={{fontFamily: 'Noto Sans TC'}}>{(sum/total*100).toFixed(2)}%</Table.Cell>
									</Table.Row>
								)
							})}
						</Table.Body>
					</Table>
				</Segment>
			</div>
		)
	}
}
