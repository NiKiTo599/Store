import React, { Suspense } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import queryString from "query-string";

import Products from "./Product";

class ProductList extends React.PureComponent {
  state = {
    isLoading: false
  };
/*
  componentDidUpdate = prevProps => {
    console.log(this.state.isLoading, prevProps.products !== this.props.products, prevProps.search === this.props.search);
    if (prevProps.products !== this.props.products) {
      this.setState({
        isLoading: !this.state.isLoading
      });
    }
  };*/

  render() {
    return (
      <>
        {this.props.products  ? (
          this.props.products.map((item, index) => (
            <Row key={index} className="justify-content-center">
              <Col key={index} xl={9}>
                <Products key={index} item={item} />
              </Col>
            </Row>
          ))
        ) : (
          null
        )}
      </>
    );
  }
}

export default ProductList;
