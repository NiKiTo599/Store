import React from 'react'

import { connect } from "react-redux";
import { fetchProducts } from "./../../actions";
import Layout from '../Layout';

class ProductPage extends React.Component {

  render() {
    console.log(this.props)
    return (<Layout>
      <div></div>
    </Layout>)
  }
}

const mapStateToProps = ({ reducer }) => {
  return {
    products: reducer.products,
    categories: reducer.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProducts: url => dispatch(fetchProducts(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);