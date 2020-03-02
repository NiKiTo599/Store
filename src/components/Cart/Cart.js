import React from "react";
import Layout from "../Layout";

import { connect } from "react-redux";
import { addToCart, deleteFromCart } from "./../../actions/actionsCart";

import "./index.scss";
import TableOfProducts from "./TableOfProducts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { InputGroup } from "react-bootstrap";

class Cart extends React.Component {
  state = {
    checkAll: false,
    checkIndexes: []
  };

  shouldDelete = () => {
    const checkBox = document.querySelectorAll(".checkbox_product");
    const arrayForIndexesForDelete = [];
    for (let i = 0; i < checkBox.length; i++) {
      if (checkBox[i].checked) {
        arrayForIndexesForDelete.push(checkBox[i].getAttribute("index"));
      }
    }
    console.log(arrayForIndexesForDelete)
    this.props.deleteFromCart(arrayForIndexesForDelete)
  };

  render() {
    return (
      <Layout>
        <div className="container_cart">
          <h2 className="cart__title">Корзина</h2>
          <InputGroup onClick={this.shouldDelete} className="xl-1 mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faTrashAlt} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <InputGroup.Text>Удаление из корзины</InputGroup.Text>
          </InputGroup>
          <InputGroup
            onClick={() => {
              this.setState({ checkAll: !this.state.checkAll });
            }}
            className="xl-1 mb-3"
          >
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faCheckSquare} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <InputGroup.Text>Выделить все товары</InputGroup.Text>
          </InputGroup>
          <TableOfProducts
            checkAll={this.state.checkAll}
            cart={this.props.cart}
          />
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
    addToCart: product => dispatch(addToCart(product)),
    deleteFromCart: productIndex => dispatch(deleteFromCart(productIndex))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
