import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom"
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const App = ({ location }) => (
  <Switch>
    <Route path='/' location={location} component={HomePage} exact={true} />
    <Route path='/login' location={location} component={LoginPage} exact={true} />
  </Switch>
)

export default App;
