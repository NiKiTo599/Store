import React from "react";
import { Row, Col, Tab, ListGroup } from "react-bootstrap";
import queryString from "query-string";

import { connect } from "react-redux";
import { getOneProduct } from "./../../actions";
import Layout from "../Layout";

import { graphql } from "react-apollo";
import { compose } from "recompose";
import { getOneProducts } from "./queries";

import "./productpage.scss";
import ReactImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import ButtonCart from "./ButtonCart";
import FormForSaleByClick from "./IsExist";
import Description from "./Description";
import Characteristic from "./Characteristic";
import Comments from "./Comments";
import Products from "../Products/Product";

const graphQLOneProduct = graphql(getOneProducts, {
  options: args => {
    const { id } = args;
    return {
      variables: {
        id
      }
    };
  }
});

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.parsedURL = queryString.parse(this.props.location.search);
    this.query = this.parsedURL.id;
    this.props.getOneProduct(this.query);
  }

  shouldComponentUpdate = nextProps => {
    if (!this.props.id || nextProps.data.product === this.props.data.product) {
      return false;
    } else {
      return true;
    }
  };

  componentDidUpdate = prevProps => {
    if (
      this.props.location.search &&
      this.props.location.search !== prevProps.location.search
    ) {
      this.parsedURL = queryString.parse(this.props.location.search);
      this.query = this.parsedURL.id;
      this.props.getOneProduct(this.query);
    }
  };

  getImagesArray = (images, category_id) => {
    return images.map(item => {
      return {
        original: require(`../../data/images/${category_id}/${item.filename}.png`),
        thumbnail: require(`../../data/images/${category_id}/${item.filename}.png`)
      };
    });
  };

  render() {
    const { product } = this.props.data;
    return product ? (
      <Layout>
        <div className="container container_for_product-page">
          <Row className="justify-content-center">
            <Col xl={10}>
              <h1 className="product_page__title">{product.name}</h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xl={6}>
              <ReactImageGallery
                items={this.getImagesArray(product.images, product.category_id)}
                showFullscreenButton={false}
                showPlayButton={false}
              />
            </Col>
            <Col xl={4}>
              <div className="product-page__right-container_up">
                <p className="price-of-product">
                  {product.regular_price.slice(
                    0,
                    product.regular_price.length - 5
                  )}
                  <i> р.</i>
                </p>
                <ButtonCart currentProduct={product} />
                <Link to="#" className="sales">
                  Узнать о возможности получения скидки
                </Link>
              </div>
              <FormForSaleByClick currentProduct={product} />
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center product_page__information_container">
            <Col xl={10}>
              <Tab.Container
                id="list-group-tabs-example"
                defaultActiveKey="#link1"
              >
                <Row justify-content-center align-items-center>
                  <Col sm={4}>
                    <ListGroup>
                      <ListGroup.Item variant="success" action href="#link1">
                        Описание
                      </ListGroup.Item>
                      <ListGroup.Item variant="success" action href="#link2">
                        Характеристики
                      </ListGroup.Item>
                      <ListGroup.Item variant="success" action href="#link3">
                        Отзывы
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col sm={8}>
                    <Tab.Content>
                      <Tab.Pane eventKey="#link1">
                        <Description descriptions={product.description} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="#link2">
                        <Characteristic attributes={product.attributes} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="#link3">
                        <Comments />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center">
            <Col xl={10}>
              <div className="additional_product">
                <h4>Вместе с этим обычно покупают</h4>
                <Products item={product} />
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    ) : null;
  }
}

const mapStateToProps = ({ reducer }) => ({
  products: reducer.products,
  categories: reducer.categories,
  id: reducer.id
});

const mapDispatchToProps = dispatch => {
  return {
    getOneProduct: url => dispatch(getOneProduct(url))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphQLOneProduct
)(ProductPage);
