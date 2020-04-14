import React from "react";
import { Row, Col } from "react-bootstrap";

import { connect } from "react-redux";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import Products from "./Product";
import ToastComponent from "../basicComponents/Toast";

class ProductList extends React.PureComponent {
  state = {
    isLoading: false,
    show: false,
    notification: {
      header: "Корзина",
      text: "",
      icon: faShoppingCart,
      link: "/cart",
      linkText: "Перейти в корзину",
    },
  };

  makeNotifications = (e, bool, classSelector) => {
    if (e) {
      const { target, currentTarget } = e;
      if (
        target.classList.contains("btn") &&
        target.innerHTML !== "Нет в наличии"
      ) {
        const text = currentTarget.querySelector(classSelector).innerHTML;
        this.setState({
          show: bool,
          notification: {
            ...this.state.notification,
            text: !this.props.cart.some((item) => item.name === text)
              ? `${text} добавлен(а) в корзину`
              : `${text} уже был(а) добавлен(а) в корзину`,
          },
        });
      }
    } else {
      this.setState({
        show: bool,
      });
    }
  };

  render() {
    return (
      <>
        {this.props.products
          ? this.props.products.map((item, index) => (
              <>
                <Row key={index} className="justify-content-center">
                  <Col
                    onClick={(e) =>
                      this.makeNotifications(e, true, ".title-of-product h3")
                    }
                    xl={9}
                    md={12}
                  >
                    <Products item={item} />
                  </Col>
                </Row>
              </>
            ))
          : null}
        <ToastComponent
          show={this.state.show}
          setShow={(e, bool) => this.makeNotifications(e, bool)}
          notification={this.state.notification}
        />
      </>
    );
  }
}

const mapStateToProps = ({ reducerCart }) => ({
  cart: reducerCart.cart,
});

export default connect(mapStateToProps)(ProductList);
