import React, { Component}  from 'react';
import logo from './logo.svg';
import queryString from 'query-string';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './App.css';
import { Grid, Menu, Header, Container } from 'semantic-ui-react'

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: '生日提醒',
      hasSendRequest: false,
      hasLoggedIn: false,
      userId: "",
      userName: "",
      userImage: ""
    };
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const login_code = values.code;
    const login_state = values.state;
    console.log("code: " + login_code + "\nstate: " + login_state);

    if(login_code !== undefined) {
      this.setState({
        hasSendRequest: true
      });
      const server_login_url = "https://nogerm-demo-test.herokuapp.com/login";
      const headers = {
        'Content-Type': 'application/json'
      }
      const data = {
        code: login_code,
        state: login_state
      }
      axios.post(server_login_url, data, headers)
      .then(response => {
        const decoded = jwt_decode(response.data.id_token);
        console.log("[login]\nuser id: " + decoded.sub + "\nuser name: " + decoded.name + "\nuser image url: " + decoded.picture);
        this.setState({
          userId: decoded.sub || "",
          userName: decoded.name || "",
          userImageUrl: decoded.picture || "",
          hasLoggedIn: true
        });
      })
      .catch(error => {
        console.log("[login] error" + error);
      });
    }


  }

  checkState = () => {

  }

  handleClick() {
    
  }

  renderMenu = () => {
    const { activeItem } = this.state;

    return (
      <Container>
        <Header as='h2' style={{ 'margin': '10px', 'color': 'white' }}>Control Center</Header>
        <Header as='h4' style={{ 'margin': '10px', 'color': 'white' }}>The Backend of Linebot.</Header>
        <Menu fluid vertical tabular style={{ 'marginTop': '50px' }}>
          <Menu.Item 
            name='生日提醒' 
            active={activeItem === '生日提醒'} 
            onClick={this.handleItemClick} 
          />
          <Menu.Item 
            name='分享提醒' 
            active={activeItem === '分享提醒'} 
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='自動回應'
            active={activeItem === '自動回應'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='週一祝福'
            active={activeItem === '週一祝福'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='功能開關'
            active={activeItem === '功能開關'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Container>
    )
  }

  renderChild = () => {
    const { activeItem } = this.state;

    if(activeItem === '生日提醒') {
      return (
        <p>生日提醒</p>
      )
    } else if(activeItem === '分享提醒') {
      return (
        <p>分享提醒</p>
      )
    } else if(activeItem === '自動回應') {
      return (
        <p>自動回應</p>
      )
    } else if(activeItem === '週一祝福') {
      return (
        <p>週一祝福</p>
      )
    } else if(activeItem === '功能開關') {
      return (
        <p>功能開關</p>
      )
    }
  }

	render() {
    const renderChild = this.renderChild;
    const renderMenu = this.renderMenu;
    const userName = this.state.userName;
    const userImageUrl = this.state.userImage;
    const loginUrl = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1554176659&redirect_uri=https://nogerm.github.io/church-backend&state=1234&scope=openid%20profile";
    return (
      <Grid>
        <Grid.Column width={3} style={{ background: '#4682B4', paddingRight: 0, height: '100vh' }}>
          {renderMenu()}
        </Grid.Column>
        <Grid.Column stretched width={12}>
          {renderChild()}
        </Grid.Column>
      </Grid>
    );
  }
	
}