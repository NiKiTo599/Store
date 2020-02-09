import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import NavigtionCategories from "./components/Home/NavCategories/NavigtionCategories";
import Home from './components/Home/Home'
import Products from "./components/Products";

export default class App extends React.Component {
  render() {
    const { history } = this.props;
    return <div className="App">
      <Switch>
        <Route history={history} path='/cart' component={NavigtionCategories}/>
        <Route history={history} path='/home' component={Home} />
        <Route history={history} path='/products' component={Products} />
        <Redirect from='/' to='/home'/>
      </Switch>
    </div>;
  }
}
