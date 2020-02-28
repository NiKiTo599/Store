import React from "react";
import { Table, InputGroup } from "react-bootstrap";
import NumericInput from "react-numeric-input";
import { Link } from "react-router-dom";

class TableOfProducts extends React.Component {
  makeProductActive = ({ currentTarget }) => {
    currentTarget.querySelector(
      ".input-group-text input"
    ).checked = !currentTarget.querySelector(".input-group-text input").checked;
  };

  shouldCheckAll = () => {
    const checkBox = document.querySelectorAll(".checkbox_product");
    console.log(checkBox)
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
                <InputGroup>
                  <InputGroup.Checkbox className="checkbox_product" variant="success" onClick={e => e.stopPropagation()} />
                </InputGroup>
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
                  <h4 className="item-of-product__title">{item.name}</h4>
                </Link>
              </td>
              <td valign="middle">
                <div className="container-in-td">{item.regular_price}</div>
              </td>
              <td onClick={e => e.stopPropagation()} valign="middle">
                <div className="container-in-td">
                  <NumericInput value={1} />
                </div>
              </td>
              <td>
                <div className="container-in-td">{item.regular_price}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default TableOfProducts;
