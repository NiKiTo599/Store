import React from "react";
import "./products.scss";
import { Button } from "react-bootstrap";

export default class Products extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="card-of-product">
        <div className="card-of-product__left">
          <h3 className="title-of-product">{item.name}</h3>
          <img
            className="image-of-product"
            src={require(`../../data/images/${item.category_id}/${item.images[0].filename}.png`)}
            alt=""
          />
        </div>
        <div className="card-of-product__right">
          <p className="price-of-product">{item.regular_price}<i> б.р.</i></p>
          <Button variant="success">Добавить в карзину</Button>
        </div>
      </div>
    );
  }
}
