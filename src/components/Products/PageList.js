import React from "react";
import "./products.scss";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCount } from "./../../actions";

import queryString from "query-string";
class PageList extends React.Component {
  constructor(props) {
    super(props);
    this.stylesForButtons = {
      disactive: "outline-success",
      active: "success"
    };
    this.page = +queryString.parse(this.props.location.search).page;
    this.nextButton = this.stylesForButtons.active;
    this.prevButton = this.stylesForButtons.disactive;
    if (this.props.location.search) {
      //this.props.fetchCount("/count" + this.props.location.search);
    }
  }
  componentDidUpdate = prevProps => {
    if (
      this.props.location.search &&
      this.props.location.search !== prevProps.location.search
    ) {
      //this.props.fetchCount("/count" + this.props.location.search);
      this.page = +queryString.parse(this.props.location.search).page;
    }
  };

  getStylesForButtons = (reason) => {
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
  }

  render() {
    const { location } = this.props;
    let reason = this.page === Math.ceil(this.props.count / 10);
    this.getStylesForButtons(reason);
    return (
      <Row>
        <Col>
          <div className="container-for-page-button">
            <Link
              to={`/home?query=${
                queryString.parse(location.search).query
              }&page=${this.page !== 1 ? this.page - 1 : 1}`}
            >
              <Button variant={this.prevButton}>Предыдущая</Button>
            </Link>
            <Link
              to={`/home?query=${
                queryString.parse(location.search).query
              }&page=${reason ? this.page : this.page + 1}`}
            >
              <Button variant={this.nextButton}>Следующая</Button>
            </Link>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ reducer }) => {
  return {
    products: reducer.products,
    count: reducer.count
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCount: url => dispatch(fetchCount(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
