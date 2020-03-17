import React, { Suspense } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import queryString from "query-string";

import Products from "./Product";
import ToastComponent from "../basicComponents/Toast";

class ProductList extends React.PureComponent {
  state = {
    isLoading: false,
    show: false
  };

  makeNotifications = (bool) => {
    this.setState({
      show: bool 
    });
  };

  render() {
    console.log(this.state.show)
    return (
      <>
        {this.props.products
          ? this.props.products.map((item, index) => (
              <>
                <Row key={index} className="justify-content-center">
                  <Col onClick={() => this.makeNotifications(true)} key={index} xl={9}>
                    <Products key={index} item={item} />
                  </Col>
                </Row>
              </>
            ))
          : null}
        <ToastComponent show={this.state.show} setShow={(bool) => this.makeNotifications(bool)}/>
      </>
    );
  }
}

export default ProductList;
