import React from "react";
import { Row, Col } from "react-bootstrap";

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
      linkText: "Перейти в корзину"
    }
  };

  makeNotifications = (e, bool, classSelector) => {
    if (e) {
      const { target, currentTarget } = e;
      if (target.classList.contains("btn")) {
        this.setState({
          show: bool,
          notification: {
            ...this.state.notification,
            text: `${currentTarget.querySelector(classSelector).innerHTML} добавлен(а) в корзину`
          }
        });
      }
    } else {
      this.setState({
        show: bool
      });
    }
  };

  render() {
    console.log(this.state.notification);
    return (
      <>
        {this.props.products
          ? this.props.products.map((item, index) => (
              <>
                <Row key={index} className="justify-content-center">
                  <Col
                    onClick={e => this.makeNotifications(e, true, ".title-of-product h3")}
                    key={index}
                    xl={9}
                  >
                    <Products key={index} item={item} />
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

export default ProductList;
