import React from "react";
import { Row, Col } from 'react-bootstrap'
import queryString from 'query-string'

import Products from './Product'

class ProductList extends React.Component {
  render() {
    return (
      <>
        {this.props.products
          ? this.props.products.map(item => (
              <Row className="justify-content-center">
                <Col xl={9}>
                  <Products item={item} />
                </Col>
              </Row>
            ))
          : null}
      </>
    );
  }
}

export default ProductList;
