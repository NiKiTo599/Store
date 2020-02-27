import React from "react";
import Layout from "../Layout";

import { connect } from "react-redux";
import { addToCart } from "./../../actions/actionsCart";

import "./index.scss";
import TableOfProducts from "./TableOfProducts";

class Cart extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container_cart">
          <h2 className="cart__title">Корзина</h2>
          {this.props.cart.map((item, idx) => (
            <div key={idx} className="cart__item-of-product">
              <img
                className="item-of-product__img"
                src={require(`../../data/images/${item.category_id}/${item.images[0].filename}.png`)}
                alt=""
              />
              <h4 className="item-of-product__title">{item.name}</h4>
            </div>
          ))}
          <TableOfProducts />
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = ({ reducer, reducerCart }) => {
  return {
    cart: reducerCart.cart,
    products: reducer.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: product => dispatch(addToCart(product))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
