import React from 'react'

import { connect } from "react-redux";
import { fetchOneProduct } from "./../../actions";
import Layout from '../Layout';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.props.getOneProduct(this.props.location.pathname + this.props.location.search)
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.location.search &&
      this.props.location.search !== prevProps.location.search
    ) {
      this.props.getOneProduct(
        this.props.location.pathname + this.props.location.search
      );
    }
  };

  render() {
    const {currentProduct} = this.props;
    console.log(this.props)
    return (<Layout>
      <div>{currentProduct}</div>
    </Layout>)
  }
}

const mapStateToProps = ({ reducer }) => {
  return {
    products: reducer.products,
    categories: reducer.categories,
    currentProduct: reducer.currentProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOneProduct: url => dispatch(fetchOneProduct(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);