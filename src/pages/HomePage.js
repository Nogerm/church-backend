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
import Avatar from '@material-ui/core/Avatar';

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
    const userName = this.state.userName;
    const userImageUrl = this.state.userImage;
    const loginUrl = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1554176659&redirect_uri=https://nogerm.github.io/church-backend&state=1234&scope=openid%20profile";
    return (

			<div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Settings
            </Typography>
            <Avatar alt="Remy Sharp" src={userImageUrl}/>
            <p>{userName}</p>
            <Button variant="contained"  color="inherit" href={loginUrl}>
              Login with LINE
            </Button>
          </Toolbar>
        </AppBar>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Home Page
          </p>
      </div>
    );
  }
	
}