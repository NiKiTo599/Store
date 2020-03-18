import React from "react";
import "../products.scss";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCount } from "../../../actions";

import { graphql } from "react-apollo";
import { compose } from "recompose";

import { countOfAllProducts } from "./queries";

import queryString from "query-string";
import { ShowedPages } from "./ShowedPages";

const graphQLCountOfAllProducts = graphql(countOfAllProducts, {
  options: ({ category_id }) => {
    return {
      variables: {
        category_id
      }
    };
  }
});

class PageList extends React.Component {
  constructor(props) {
    super(props);
    this.stylesForButtons = {
      disactive: "outline-success",
      active: "success"
    };
    this.state = {
      page: +queryString.parse(this.props.location.search).page,
      query: queryString.parse(this.props.location.search).query
    };
    this.nextButton = this.stylesForButtons.active;
    this.prevButton = this.stylesForButtons.disactive;
  }
  componentDidUpdate = prevProps => {
    if (
      this.props.location.search &&
      this.props.location.search !== prevProps.location.search
    ) {
      this.setState({
        page: +queryString.parse(this.props.location.search).page,
        query: queryString.parse(this.props.location.search).query
      });
    }
  };

  getStylesForButtons = reason => {
    if (this.page === 1 && reason) {
      this.nextButton = this.stylesForButtons.disactive;
      this.prevButton = this.stylesForButtons.disactive;
    } else if (this.page === 1) {
      this.prevButton = this.stylesForButtons.disactive;
    } else if (reason) {
      this.nextButton = this.stylesForButtons.disactive;
    } else {
      this.nextButton = this.stylesForButtons.active;
      this.prevButton = this.stylesForButtons.active;
    }
  };

  render() {
    const { page, query } = this.state;
    let count;
    if (this.props.countProducts) {
      count = this.props.countProducts;
    } else {
      count = this.props.data.count;
    }
    const lastPage = Math.ceil(count / 10);
    let reason = this.page === lastPage;
    this.getStylesForButtons(reason);
    return (
      <Row>
        <Col>
          <div className="container-for-page-button">
            <Link to={`/home?query=${query}&page=${page !== 1 ? page - 1 : 1}`}>
              <Button variant={this.prevButton}>Предыдущая</Button>
            </Link>
            <ShowedPages page={page} count={lastPage} query={query} />
            <Link to={`/home?query=${query}&page=${reason ? page : page + 1}`}>
              <Button variant={this.nextButton}>Следующая</Button>
            </Link>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ reducer, reducerSortSection }) => {
  return {
    category_id: reducer.category_id,
    countProducts: reducerSortSection.countProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCount: url => dispatch(fetchCount(url))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphQLCountOfAllProducts
)(PageList);
