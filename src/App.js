import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom"
import HomePage from "./pages/HomePage";

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/:code?/:state?' component={HomePage} exact={true} />
      </Switch>
    );
  }
}
