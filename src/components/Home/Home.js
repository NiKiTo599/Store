import React from "react";
import Layout from "../Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { fetchProducts } from "./../../actions";

import "./index.scss";
import { Row, Container, Col } from "react-bootstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props.getProducts(
      this.props.location.pathname + this.props.location.search
    );
  }

  componentDidUpdate = prevProps => {
    if (this.props.location.search !== prevProps.location.search) {
      this.props.getProducts(
        this.props.location.pathname + this.props.location.search
      );
    }
  };

  getCategoryAndSubCategory = () => {
    let category, subCategory;
    const { categories, location } = this.props;
    for (let key in categories) {
      if (!category) {
        let reason = categories[key].find(
          elem => elem._id === location.search.slice(7)
        );
        if (reason) {
          category = key;
          subCategory = reason.name;
        }
      }
    }
    return {
      category,
      subCategory
    };
  };

  render() {
    const { category, subCategory } = this.getCategoryAndSubCategory();
    return (
      <Layout>
        <Container>
          <Row>
            <Col xl={12}>
              <p className="title-of-category">
                <span>{category}</span>
                <FontAwesomeIcon icon={faAngleDoubleRight} />{" "}
                <span>{subCategory}</span>
              </p>
            </Col>
          </Row>
          {this.props.products
            ? this.props.products.map(item => (
                <Row className="justify-content-center">
                  <Col xl={9}>
                  </Col>
                </Row>
              ))
            : null}
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = ({ reducer }) => {
  return {
    products: reducer.products,
    categories: reducer.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProducts: url => dispatch(fetchProducts(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
