import React from "react";

import './sort.scss'

class SortSection extends React.Component {
  getAtributes = () => {
    const { products } = this.props;
    const allAtributesOfProducts = {};
    products.forEach(elem => {
      elem.attributes.reduce((acc, cur) => {
        if (cur.name === "Артикул") return acc;
        if (cur.name in acc) {
          if (!acc[cur.name].includes(cur.value)) acc[cur.name].push(cur.value);
        } else {
          acc[cur.name] = [cur.value];
        }
        return acc;
      }, allAtributesOfProducts);
    });
    return allAtributesOfProducts;
  };
  render() {
    if (this.props.products) {
      const allAtributesOfProducts = this.getAtributes();
      const keys = Object.keys(allAtributesOfProducts);
      return <div className="container-for-sort">
        {
          keys.map((elem, index) => (
          <p key={index} className="sort-attribute">{elem}: {allAtributesOfProducts[elem].map((item, index) => <span key={index}>{item}</span>)}</p>
          ))
        }
      </div>;
    } else {
      return null;
    }
  }
}

export default SortSection;
