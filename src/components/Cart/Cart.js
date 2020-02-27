import React from "react";
import Layout from "../Layout";

import { connect } from "react-redux";
import { addToCart } from "./../../actions/actionsCart";

import './index.scss'

class Cart extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container_cart">
          <h2 className="cart_title">Корзина</h2>
          {this.props.cart.map((item, idx) => <div className="cart_item-of-product">{item.name}</div>)}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = ({ reducerCart }) => {
  return {
    cart: reducerCart.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: product => dispatch(addToCart(product))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

