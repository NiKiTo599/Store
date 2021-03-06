import React from "react";
import Layout from "../Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";

import { graphql } from "react-apollo";
import { compose } from "recompose";
import { productsQuery } from "./queries";

import { saveProductCategoriesID } from "../../actions";
import { savePrices } from "../../actions/sortSectionAction";
import { connect } from "react-redux";

import "./index.scss";
import { Row, Container, Col, Spinner } from "react-bootstrap";
import ProductList from "../Products/ProductList";
import PageList from "../Products/NavigateForPages/PageList";
import SortSection from "./SortSection/SortSection";
import { Element } from "react-scroll";
import IconsOfCategories from "./IconsOfCategories";

const graphQLProducts = graphql(productsQuery, {
  options: (args) => {
    const { category_id, page, attributesForSearch, isClicked, prices } = args;
    let values;
    if (isClicked && attributesForSearch) {
      const keysAttributes = Object.keys(attributesForSearch);
      values = [];
      for (let i = 0; i < keysAttributes.length; i++) {
        values = values.concat(attributesForSearch[keysAttributes[i]]);
      }
    }
    return {
      variables: {
        category_id,
        page,
        attr: values,
        /* prices: prices */
      },
    };
  },
});

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.parsedURL = queryString.parse(this.props.location.search);
    this.query = this.parsedURL.query;
    this.page = this.parsedURL.page;
    this.props.saveProductCategoriesID(this.query, this.page);
  }

  state = {
    isLoading: false,
  };

  componentDidMount = () => {
    this.setState({ isLoading: true }, function () {
      setTimeout(
        function () {
          this.setState({ isLoading: false });
        }.bind(this),
        3000
      );
    });
  };

  componentDidUpdate = (prevProps) => {
    if (
      this.props.location.search &&
      this.props.location.search !== prevProps.location.search
    ) {
      this.parsedURL = queryString.parse(this.props.location.search);
      this.query = this.parsedURL.query;
      this.page = this.parsedURL.page;
      this.props.saveProductCategoriesID(this.query, this.page);
      this.setState({ isLoading: true }, function () {
        setTimeout(
          function () {
            this.setState({ isLoading: false });
          }.bind(this),
          3000
        );
      });
    }
  };

  getCategoryAndSubCategory = () => {
    let category, subCategory;
    const { categories, location } = this.props;
    for (let key in categories) {
      if (!category) {
        let end = location.search.indexOf("page") - 1;
        let reason = categories[key].find(
          (elem) => elem._id === location.search.slice(7, end)
        );
        if (reason) {
          category = key;
          subCategory = reason.name;
        }
      }
    }
    return {
      category,
      subCategory,
    };
  };

  render() {
    const { category, subCategory } = this.getCategoryAndSubCategory();
    console.log(this.props.data.variables)
    return (
      <Layout >
        <Container className="container-for-products">
          {this.props.location.search ? (
            <>
              {window.screen.width <= 768 ? null : (
                <Row>
                  <Col xl={12}>
                    <p className="title-of-category">
                      <span>{category}</span>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />{" "}
                      <span>{subCategory}</span>
                    </p>
                  </Col>
                </Row>
              )}

              <SortSection query={this.query} prices={this.props.prices} savePrices={this.props.savePrices}/>
              <Element name="first_navigation" />
              <PageList location={this.props.location} />
              <section className="container-for-products">
                {!this.state.isLoading ? (
                  <ProductList
                    search={this.props.location.search}
                    products={this.props.data.products}
                  />
                ) : (
                  <Spinner animation="border" variant="success" size="big" />
                )}
              </section>

              <PageList
                isClicked={this.props.isClicked}
                location={this.props.location}
              />
            </>
          ) : (
            <IconsOfCategories />
          )}
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (store) => {
  const { reducer, reducerSortSection } = store;
  return {
    category_id: reducer.category_id,
    page: reducer.page,
    categories: reducer.categories,
    isClicked: reducerSortSection.isClicked,
    attributesForSearch: reducerSortSection.attributesForSearch,
    prices: reducerSortSection.prices,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProductCategoriesID: (id, page) =>
      dispatch(saveProductCategoriesID(id, page)),
    savePrices: (prices) => dispatch(savePrices(prices)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphQLProducts
)(Home);
