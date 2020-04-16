import React from "react";
import { Row, Col, Tab, ListGroup } from "react-bootstrap";
import queryString from "query-string";

import { connect } from "react-redux";
import { getOneProduct } from "./../../actions";
import Layout from "../Layout";

import { graphql } from "react-apollo";
import { compose } from "recompose";
import { getOneProducts } from "./queries";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import "./productpage.scss";
import ReactImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import ButtonCart from "./ButtonCart";
import FormForSaleByClick from "./IsExist";
import Description from "./Description";
import Characteristic from "./Characteristic";
import Comments from "./Comments";
import Products from "../Products/Product";
import ToastComponent from "../basicComponents/Toast";

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

class ProductPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.parsedURL = queryString.parse(this.props.location.search);
    this.query = this.parsedURL.id;
    this.props.getOneProduct(this.query);
  }

  state = {
    show: false,
    notification: {
      header: "Корзина",
      text: "",
      icon: faShoppingCart,
      link: "/cart",
      linkText: "Перейти в корзину"
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

  makeNotifications = (e, bool, classSelector) => {
    if (e) {
      const { target } = e;
      if (target.classList.contains("btn") && target.innerHTML !== 'Нет в наличии') {
        const text = document.querySelector(classSelector).innerHTML;
        this.setState({
          show: bool,
          notification: {
            ...this.state.notification,
            text: !this.props.cart.some(item => item.name === text) ? `${text} добавлен(а) в корзину` : `${text} уже был(а) добавлен(а) в корзину`
          }
        });
      }
    } else {
      this.setState({
        show: bool
      });
    }
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
            <Col xl={6} sm={6}>
              <ReactImageGallery
                items={this.getImagesArray(product.images, product.category_id)}
                showFullscreenButton={false}
                showPlayButton={false}
              />
            </Col>
            <Col
              xl={4}
              sm={4}
              onClick={e =>
                this.makeNotifications(e, true, ".product_page__title")
              }
            >
              <div className="product-page__right-container_up">
                <p className="price-of-product">
                  {product.regular_price}
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
                <Row className="justify-content-center align-items-center">
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
        <ToastComponent
          show={this.state.show}
          setShow={(e, bool) => this.makeNotifications(e, bool)}
          notification={this.state.notification}
        />
      </Layout>
    ) : null;
  }
}

const mapStateToProps = ({ reducer, reducerCart }) => ({
  products: reducer.products,
  id: reducer.id,
  cart: reducerCart.cart
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
