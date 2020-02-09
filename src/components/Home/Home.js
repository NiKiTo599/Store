import React from "react";
import Layout from "../Layout";
import NavigationCategories from "./NavCategories/NavigtionCategories";

import './index.scss'

export default class Home extends React.Component {
  render() {
    return (
      <Layout>
        <aside className='container-categories'>
          <NavigationCategories />
        </aside>
      </Layout>
    );
  }
}
