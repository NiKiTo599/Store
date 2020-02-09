import React from "react";
import Layout from "../Layout";

import "./index.scss";


export default class Home extends React.Component {
  componentDidMount = () => {
    this.props.getProducts('/home');
  }

  render() {
    return (
      <Layout>
      </Layout>
    );
  }
}
