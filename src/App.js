import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom"
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/:code?/:state?' component={HomePage} exact={true} />
      </Switch>
    );
  }
}

export default App;
