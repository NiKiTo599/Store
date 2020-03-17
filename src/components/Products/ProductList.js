import React, { Suspense } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import queryString from "query-string";

import Products from "./Product";

class ProductList extends React.PureComponent {
  state = {
    isLoading: false
  };

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
