import React from "react";
import { Table, Form } from "react-bootstrap";
import NumericInput from "react-numeric-input";
import { Link } from "react-router-dom";
import TooltipComponent from "../basicComponents/Toottips";

class TableOfProducts extends React.Component {
  state = {};

  makeProductActive = ({ currentTarget }) => {
    currentTarget.querySelector(
      ".form-check-input"
    ).checked = !currentTarget.querySelector(".form-check-input").checked;
  };

  shouldCheckAll = () => {
    const checkBox = document.querySelectorAll(".form-check-input");
    if (this.props.checkAll) {
      for (let i = 0; i < checkBox.length; i++) {
        checkBox[i].checked = true;
      }
    } else {
      for (let i = 0; i < checkBox.length; i++) {
        checkBox[i].checked = false;
      }
    }
  };

  showNotAll = title => {
    return (
      <TooltipComponent text={title}>
        <span>{title.length >= 20 ? `${title.slice(0, 20)}...` : title}</span>
      </TooltipComponent>
    );
  };

  changeNumericInput = (value, valueStr, input) => {
    this.setState({
      [input.id]: value
    });
    return value
  };

  render() {
    const { cart } = this.props;
    this.shouldCheckAll();
    return (
      <Table className="table-cart" striped bordered hover variant="success">
        <thead>
          <tr>
            <th>#</th>
            <th>Наименование товара</th>
            <th>Цена, руб.</th>
            <th>Количество, шт.</th>
            <th>Сумма, руб.</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, idx) => (
            <tr index={idx} key={idx} onClick={this.makeProductActive}>
              <td>
                <Form.Group>
                  <Form.Check
                    index={idx}
                    className="checkbox_product"
                    variant="success"
                    onClick={e => e.stopPropagation()}
                    label=""
                  />
                  <label></label>
                </Form.Group>
              </td>
              <td>
                <Link
                  to={`/product?id=${item._id}`}
                  onClick={e => e.stopPropagation()}
                  className="cart__item-of-product"
                >
                  <img
                    className="item-of-product__img"
                    src={require(`../../data/images/${item.category_id}/${item.images[0].filename}.png`)}
                    alt=""
                  />
                  <h4 className="item-of-product__title">
                    {this.showNotAll(item.name)}
                  </h4>
                </Link>
              </td>
              <td valign="middle">
                <div className="container-in-td">
                  {item.regular_price.slice(
                    0,
                    item.regular_price.indexOf("р") - 1
                  )}{" "}
                  р.
                </div>
              </td>
              <td onClick={e => e.stopPropagation()} valign="middle">
                <div className="container-in-td">
                  <NumericInput
                    id={idx}
                    onChange={this.changeNumericInput}
                    value={this.state[idx] ? this.state[idx] : 1}
                  />
                </div>
              </td>
              <td>
                <div className="container-in-td">
                  {+item.regular_price
                    .replace(/\s+/g, "")
                    .slice(0, item.regular_price.indexOf("р") - 2) *
                    (this.state[idx] ? this.state[idx] : 1)}{" "}
                  р.
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default TableOfProducts;
