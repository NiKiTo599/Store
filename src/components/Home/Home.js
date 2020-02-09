import React from "react";
import Layout from "../Layout";

import { connect } from 'react-redux';
import { fetchProducts } from './../../actions'

import "./index.scss";


class Home extends React.Component {
  componentDidMount = () => {
    this.props.getProducts(this.props.location.pathname + this.props.location.search);
  }

  render() {
       return (
      <Layout>
        {
          this.props.products ? this.props.products.map(item => item.name) : null
        }
      </Layout>
    );
   
  }
}

const mapStateToProps = ({ reducer }) => {
  console.log(reducer)
  return {
    products: reducer.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: (url) => dispatch(fetchProducts(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
