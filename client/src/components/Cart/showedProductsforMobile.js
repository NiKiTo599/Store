import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import NumericInput from "react-numeric-input";


const ShowedProductsforMobile = ({
  cart,
  makeProductActive,
  changeNumericInput,
  state
}) => (
  <section className="table-cart">
    {cart.map((item, idx) => (
      <div key={idx} className="product_of_cart_mobile">
        <div className="container_for_top">
          <Form.Group onClick={makeProductActive}>
            <Form.Check
              index={idx}
              className="checkbox_product"
              variant="success"
              onClick={e => e.stopPropagation()}
              label=""
            />
            <label></label>
          </Form.Group>
          <Link
            to={`/product?id=${item._id}`}
            onClick={e => e.stopPropagation()}
            className="cart__item-of-product"
          >
            <h4 className="item-of-product__title">{item.name}</h4>
          </Link>
        </div>
        <div className="container_for_bottom">
          <img
            className="item-of-product__img"
            src={require(`../../data/images/${item.category_id}/${item.images[0].filename}.png`)}
            alt=""
          />
          <div className="container_for_bottom_right">
            <p>
              {+item.regular_price *
                (state[idx] ? state[idx] : 1)}{" "}
              р.
            </p>
            <NumericInput
              id={idx}
              style={{
                btnUp: {
                  background: "var(--success)"
                },
                btnDown: {
                  background: "var(--success)"
                },
                plus: {
                  background: "white"
                },
                minus: {
                  background: "white"
                }
              }}
              onChange={changeNumericInput}
              value={state[idx] ? state[idx] : 1}
            />
          </div>
        </div>
      </div>
    ))}
  </section>
);

export default ShowedProductsforMobile;
