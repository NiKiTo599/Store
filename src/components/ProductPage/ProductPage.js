import React from "react";
import { Button, Row, Col, Form, Tab, ListGroup } from "react-bootstrap";

import { connect } from "react-redux";
import { fetchOneProduct } from "./../../actions";
import Layout from "../Layout";

import "./productpage.scss";
import ReactImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import ButtonCart from "./ButtonCart";
import FormForSaleByClick from "./IsExist";
import Description from "./Description";
import Characteristic from "./Characteristic";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.props.getOneProduct(
      this.props.location.pathname + this.props.location.search
    );
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.location.search &&
      this.props.location.search !== prevProps.location.search
    ) {
      this.props.getOneProduct(
        this.props.location.pathname + this.props.location.search
      );
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
    const { currentProduct } = this.props;
    return currentProduct ? (
      <Layout>
        <div className="container container_for_product-page">
          <Row className="justify-content-center">
            <Col xl={10}>
              <h1>{currentProduct.name}</h1>
            </Col>
          </Row>
          <Row>
            <Col xl={5}>
              <ReactImageGallery
                items={this.getImagesArray(
                  currentProduct.images,
                  currentProduct.category_id
                )}
                showFullscreenButton={false}
                showPlayButton={false}
              />
            </Col>
            <Col xl={5}>
              <div className="product-page__right-container_up">
                <p className="price-of-product">
                  {currentProduct.regular_price.slice(
                    0,
                    currentProduct.regular_price.length - 5
                  )}
                  <i> б.р.</i>
                </p>
                <ButtonCart currentProduct={currentProduct} />
                <Link to="#" className="sales">
                  Узнать о возможности получения скидки
                </Link>
              </div>
              <FormForSaleByClick currentProduct={currentProduct} />
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <Tab.Container
                id="list-group-tabs-example"
                defaultActiveKey="#link1"
              >
                <Row>
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
                        <Description descriptions={currentProduct.description} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="#link2">
                        <Characteristic attributes={currentProduct.attributes}/>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
        </div>
      </Layout>
    ) : null;
  }
}

const mapStateToProps = ({ reducer }) => {
  return {
    products: reducer.products,
    categories: reducer.categories,
    currentProduct: reducer.currentProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOneProduct: url => dispatch(fetchOneProduct(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
