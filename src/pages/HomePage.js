import React, { Component}  from 'react';
import logo from './logo.svg';
import queryString from 'query-string';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './App.css';
import { Grid, Menu, Header, Container, Segment } from 'semantic-ui-react'

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'bio',
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

	render() {
    const { activeItem } = this.state
    const userName = this.state.userName;
    const userImageUrl = this.state.userImage;
    const loginUrl = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1554176659&redirect_uri=https://nogerm.github.io/church-backend&state=1234&scope=openid%20profile";
    return (
      <Grid>
        <Grid.Row columns={1} style={{background: 'green'}}>
          <Header as='h1'>This is a loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong herder</Header>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={3}>
            <Menu fluid vertical tabular>
              <Menu.Item name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick} />
              <Menu.Item name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick} />
              <Menu.Item
                name='companies'
                active={activeItem === 'companies'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='links'
                active={activeItem === 'links'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment>
              This is an stretched grid column. This segment will always match the tab height
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
	
}