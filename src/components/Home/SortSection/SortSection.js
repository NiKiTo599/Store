import React from "react";

import { connect } from "react-redux";
import { fetchAttributes } from "./../../../actions";

import "./sort.scss";

class SortSection extends React.Component {
  constructor(props) {
    super(props);
    this.path = '/productattributes'
    this.props.getAttributes(this.path + this.props.url);
  }
  componentDidUpdate = prevProps => {
    if (this.props.url !== prevProps.url) {
      this.props.getAttributes(this.path + this.props.url);
    }
  };
  getAttributesFromData = () => {
    const { attributes } = this.props;
    const allAtributesOfProducts = {};
    attributes.forEach(elem => {
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
    if (this.props.attributes) {
      const allAtributesOfProducts = this.getAttributesFromData();
      const keys = Object.keys(allAtributesOfProducts);
      return (
        <div className="container-for-sort">
          {keys.map((elem, index) => (
            <p key={index} className="sort-attribute">
              {elem}:{" "}
              {allAtributesOfProducts[elem].map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </p>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ reducer }) => {
  return {
    attributes: reducer.attributes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAttributes: url => dispatch(fetchAttributes(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortSection);
