import React from "react";
import { Button } from "react-bootstrap";

import { connect } from "react-redux";
import { addToCart } from "./../../actions/actionsCart";



const ButtonCart = ({ currentProduct, addToCart }) => (
  <div>
    {currentProduct.stock.slice(0, 8) === "добавить" ? (
      <Button onClick={() => addToCart(currentProduct)} variant="success">Добавить в карзину</Button>
    ) : (
      <Button variant="outline-success">Нет в наличии</Button>
    )}
  </div>
);

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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonCart);
