import React, { Component}  from 'react';
import logo from './logo.svg';
import queryString from 'query-string'

export default class LoginPage extends Component {

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    console.log("code: " + values.code) // "top"
    console.log("state: " + values.state) // "im"
  }

  handleClick() {
    
  }

	render() {
    return (
			<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Login Page
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