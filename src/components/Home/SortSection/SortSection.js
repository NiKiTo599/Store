import React from "react";

import { connect } from "react-redux";
import { fetchAttributes } from "./../../../actions";
import {
  highlightAttribute,
  unHighlightAttribute,
  deleteOneField,
  fetchOnlySelectionProducts
} from "./../../../actions/sortSectionAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import "./sort.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class SortSection extends React.Component {
  constructor(props) {
    super(props);
    this.path = "/productattributes";
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
    return this.sortAttributes(allAtributesOfProducts);
  };

  sortAttributes = objectOfAttributes => {
    const sortedObjectOfAttributes = { ...objectOfAttributes };
    for (let key in objectOfAttributes) {
      sortedObjectOfAttributes[key].sort((a, b) =>
        a < b ? -1 : a > b ? 1 : 0
      );
    }
    return sortedObjectOfAttributes;
  };

  highlightAttribute = ({ currentTarget, target }) => {
    if (target.classList.contains("attribute")) {
      target.classList.toggle("highlight");
      if (target.classList.contains("highlight")) {
        const key = currentTarget.querySelector("b").innerHTML;
        this.props.highlightAttribute({ [key]: [target.innerHTML] });
      } else {
        const key = currentTarget.querySelector("b").innerHTML;
        this.props.unHighlightAttribute({ [key]: [target.innerHTML] });
      }
    } else if (!target.classList.contains("sort-attribute")) {
      const collectionOfAttributes = currentTarget.querySelectorAll(
        ".highlight"
      );
      for (let i = 0; i < collectionOfAttributes.length; i++) {
        collectionOfAttributes[i].classList.toggle("highlight", false);
      }
      this.props.deleteOneField(currentTarget.querySelector("b").innerHTML);
    }
  };

  handleClickButton = () => {
    this.props.fetchOnlySelectionProducts(`/home`, this.props.attributesForSearch);
  }

  render() {
    console.log(this.props.attributesForSearch)
    if (this.props.attributes) {
      const allAtributesOfProducts = this.getAttributesFromData();
      const keys = Object.keys(allAtributesOfProducts);
      return (
        <div className="container-for-sort">
          {keys.map((elem, index) => (
            <p
              key={index}
              onClick={this.highlightAttribute}
              className="sort-attribute"
            >
              <b>{elem}</b>:{" "}
              {allAtributesOfProducts[elem].map((item, index) => (
                <span className="attribute" key={index}>
                  {item}
                </span>
              ))}
              <FontAwesomeIcon icon={faTrashAlt} />
            </p>
          ))}
          <Link to="/home"><Button onClick={this.handleClickButton} variant="success">Показать выбранные</Button></Link>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ reducer, reducerSortSection }) => {
  return {
    attributes: reducer.attributes,
    attributesForSearch: reducerSortSection.attributesForSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAttributes: url => dispatch(fetchAttributes(url)),
    highlightAttribute: attr => dispatch(highlightAttribute(attr)),
    unHighlightAttribute: attr => dispatch(unHighlightAttribute(attr)),
    deleteOneField: field => dispatch(deleteOneField(field)),
    fetchOnlySelectionProducts: (url, fields) => dispatch(fetchOnlySelectionProducts(url, fields))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortSection);
