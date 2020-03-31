import React from "react";
import "./products.scss";
import "../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss";
import { Link } from "react-router-dom";
import ButtonCart from "../ProductPage/ButtonCart";

export default class Products extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="card-of-product">
        <Link className="title-of-product" to={`/product?id=${item._id}`}>
          <h3>{item.name}</h3>
        </Link>
        <div className="card-of-product__main">
          <div className="card-of-product__left">
            <img
              className="image-of-product"
              src={require(`../../data/images/${item.category_id}/${item.images[0].filename}.png`)}
              alt=""
            />
          </div>
          <div className="card-of-product__right">
            {window.screen.width >= 769 ? (
              <p className="info_about_project">
                Заказывай сегодня и мы доставим в ближайшее время!
              </p>
            ) : null}
            <div className="container_for_price">
              <p className="price-of-product">
                {item.regular_price}
                <i> б.р.</i>
              </p>
              <ButtonCart currentProduct={item} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
