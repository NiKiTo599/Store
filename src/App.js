import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";

export default class App extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <Switch>
        <Route history={history} path="/cart" component={Cart} />
        <Route history={history} path="/home" component={Home} />
        <Redirect from="/" to="/home" />
      </Switch>
    );
  }
}
