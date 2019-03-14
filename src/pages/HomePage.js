import React, { Component}  from 'react';
import queryString from 'query-string';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './App.css';
import { Grid, Menu, Image, Header, Button, Segment } from 'semantic-ui-react'

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'bio',
      hasSendRequest: false,
      hasLoggedIn: false,
      userId: "",
      userName: "",
      userImageUrl: ""
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

  handleLoginClicked = () => {
    const loginUrl = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1554176659&redirect_uri=https://nogerm.github.io/church-backend&state=1234&scope=openid%20profile";
    window.location.href = loginUrl;
  }

  renderBody = () => {
    const { activeItem } = this.state
    const hasLoggedIn = this.state.hasLoggedIn;
    if(hasLoggedIn) {
      return (
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
      )
    } else {
      return (
        <Header as='H1' style={{color:'white'}}>請先登入</Header>
      )
    }
  }

	render() {
    const renderBody  = this.renderBody;
    const userName = this.state.userName;
    const userImageUrl = this.state.userImageUrl;
    return (
      <Grid>
        <Grid.Row columns={1} style={{padding: '0px'}}>
          <Segment raised style={{background: '#9ccc65', margin: '0px', flex:1}}>
            <Grid columns={5}>
              <Grid.Column>
                <Image style={{height:'40px'}} src='https://886point.com/wp-content/uploads/2018/07/icon512-2x-600x600.png'/>
              </Grid.Column>
              <Grid.Column style={{flex:1}}>
                <Header as='H1' style={{color:'white'}}>LINE Console</Header>
              </Grid.Column>
              <Grid.Column>
                <Image avatar src={userImageUrl} style={{width:'40px', height:'40px'}}/>
              </Grid.Column>
              <Grid.Column>
                <Header as='H1' style={{color:'white'}}>{userName}</Header>
              </Grid.Column>
              <Grid.Column>
                <Button floated='right' onClick={this.handleLoginClicked}>LINE LOGIN</Button>
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Row>
        {renderBody()}
      </Grid>
    );
  }
	
}