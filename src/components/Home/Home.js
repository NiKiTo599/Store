import React from "react";
import Layout from "../Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { fetchProducts } from "./../../actions";

import "./index.scss";
import { Row, Container, Col } from "react-bootstrap";
import ProductList from "../Products/ProductList";
import PageList from "../Products/PageList";
import SortSection from "./SortSection/SortSection";

class Home extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.location.search) {
      this.props.getProducts(
        this.props.location.pathname + this.props.location.search
      );
    }
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.location.search &&
      this.props.location.search !== prevProps.location.search
    ) {
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
        let end = location.search.indexOf('page') - 1;
        let reason = categories[key].find(
          elem => elem._id === location.search.slice(7, end)
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
          {this.props.location.search ? (
            <>
              <Row>
                <Col xl={12}>
                  <p className="title-of-category">
                    <span>{category}</span>
                    <FontAwesomeIcon icon={faAngleDoubleRight} />{" "}
                    <span>{subCategory}</span>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <SortSection products={this.props.products} />
                </Col>
              </Row>
              <ProductList products={this.props.products} />
              <PageList location={this.props.location} />
            </>
          ) : null}
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
