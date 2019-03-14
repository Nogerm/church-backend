import React, { Component}  from 'react';
import logo from './logo.svg';
import queryString from 'query-string';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasSendRequest: false,
      hasLoggedIn: false
    };
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const login_code = values.code;
    const login_state = values.state;
    console.log("code: " + login_code + "\nstate: " + login_state);

    if(login_code !== undefined) {
      const server_login_url = "https://nogerm-demo-test.herokuapp.com/login";
      const headers = {
        'Content-Type': 'application/json'
      }
      const data = {
        code: login_code,
        state: login_state
      }
      axios.post(server_login_url, data, headers)
      .then(function (response) {
        const decoded = jwt_decode(response.data.id_token);
        const userId = decoded.sub;
        const userName = decoded.name;
        const userImageUrl = decoded.picture;
        console.log("[login] user id: " + userId + "\nuser name: " + userName + "\nuser image url: " + userImageUrl);
      })
      .catch(function (error) {
        console.log("[login] error" + error);
      });
    }


  }

  handleClick() {
    
  }

	render() {
    return (

			<div>
        <AppBar position="static">
        <Toolbar>
          <IconButton  color="inherit" aria-label="Menu">
          </IconButton>
          <Typography variant="h6" color="inherit">
            Settings
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Home Page
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1554176659&redirect_uri=https://nogerm.github.io/church-backend&state=1234&scope=openid%20profile" onClick={this.handleClick.bind(this)}>Sign in with Github</a>;

      </div>
    );
  }
	
}