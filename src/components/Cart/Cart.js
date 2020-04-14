import React from "react";
import Layout from "../Layout";

import { connect } from "react-redux";
import { addToCart, deleteFromCart } from "./../../actions/actionsCart";

import "./index.scss";
import TableOfProducts from "./TableOfProducts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { InputGroup, Row, Col } from "react-bootstrap";
import TooltipComponent from "../basicComponents/Toottips";

class Cart extends React.Component {
  state = {
    checkAll: false,
    checkIndexes: []
  };

  shouldDelete = () => {
    const checkBox = document.querySelectorAll(".form-check-input");
    const arrayForIndexesForDelete = [];
    for (let i = 0; i < checkBox.length; i++) {
      if (checkBox[i].checked) {
        arrayForIndexesForDelete.push(checkBox[i].getAttribute("index"));
      }
    }
    this.props.deleteFromCart(arrayForIndexesForDelete);
  };

  render() {
    const { width } = window.screen;
    return (
      <Layout>
        <div className="container_cart">
          <h2 className="cart__title">Корзина</h2>
          <Row className="justify-content-center">
            <Col xl={10}>
              <div className="container_for_actions">
                {width >= 768 ? (
                  <>
                    <TooltipComponent
                      text={
                        this.state.checkAll
                          ? "Снять выделение"
                          : "Выделить все товары"
                      }
                    >
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
                      </InputGroup>
                    </TooltipComponent>
                    <TooltipComponent text="Удаление из корзины">
                      <InputGroup
                        onClick={this.shouldDelete}
                        className="xl-1 mb-3"
                      >
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                      </InputGroup>
                    </TooltipComponent>
                  </>
                ) : (
                  <>
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
                    </InputGroup>
                    <InputGroup
                      onClick={this.shouldDelete}
                      className="xl-1 mb-3"
                    >
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                    </InputGroup>
                  </>
                )}
              </div>
            </Col>
          </Row>
          {this.props.cart.length > 0 ? (
            <Row className="justify-content-center">
              <Col xl={10} sm={10}>
                <TableOfProducts
                  checkAll={this.state.checkAll}
                  cart={this.props.cart}
                />
              </Col>
            </Row>
          ) : (
            <p className="cart_paragraph">К сожалению, ваша корзина пуста.</p>
          )}
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
