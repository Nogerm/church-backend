import React, { Component}  from 'react';
import logo from './logo.svg';
import queryString from 'query-string';
import axios from 'axios';
import './App.css';

export default class HomePage extends Component {

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const login_code = values.code;
    const login_state = values.state;
    console.log("code: " + login_code + "\nstate: " + login_state);

    if(login_code != undefined) {
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
        console.log("[login] success" + response);
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
			<div className="App">
        <header className="App-header">
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
        </header>
      </div>
    );
  }
	
}