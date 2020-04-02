import React from "react";

import { connect } from "react-redux";
import {
  highlightAttribute,
  unHighlightAttribute,
  deleteOneField,
  clickShow,
  saveFoundProducts,
  deleteAllAttributes,
  existSortAttributes
} from "./../../../actions/sortSectionAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { graphql } from "react-apollo";
import { compose } from "recompose";
import { allAttributesQuery } from "./queries";

import "./sort.scss";
import AttributeSortButton from "./AttributeSortButton";
import TooltipComponent from "../../basicComponents/Toottips";
import { Row, Col } from "react-bootstrap";
import SortSectionForMobile from "./SortSectionForMobile";

const graphQLAllAttributes = graphql(allAttributesQuery, {
  options: ({ category_id }) => {
    return {
      variables: {
        category_id
      }
    };
  }
});

class SortSection extends React.Component {
  componentDidUpdate = prevProps => {
    if (this.props.query !== prevProps.query) {
      this.props.deleteAllAttributes();
    }
  };
  getAttributesFromData = () => {
    const { productsAttributes } = this.props.data;
    const allAtributesOfProducts = {};
    productsAttributes.forEach(elem => {
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


  render() {
    const { width } = window.screen;
    if (this.props.data.productsAttributes) {
      this.props.existSortAttributes(this.props.data.productsAttributes)
      const allAtributesOfProducts = this.getAttributesFromData();
      const keys = Object.keys(allAtributesOfProducts);
      return (
        <>
          {width <= 768 ? (
            <SortSectionForMobile
              arrayOfAllAtributes={this.props.arrayOfAllAtributes}
              isSort={this.props.isSort}
              saveFoundProducts={this.props.saveFoundProducts}
              nameOfCategoryOfAttributes={keys}
              attributes={allAtributesOfProducts}
              isClicked={this.props.isClicked}
              query={this.props.query}
              highlightAttribute={this.props.highlightAttribute}
              unHighlightAttribute={this.props.unHighlightAttribute}
            />
          ) : (
            <Row>
              <Col>
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
                      <TooltipComponent text={"Сбросить категорию"}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </TooltipComponent>
                    </p>
                  ))}
                  <AttributeSortButton
                    saveFoundProducts={this.props.saveFoundProducts}
                    arrayOfAllAtributes={this.props.arrayOfAllAtributes}
                    isSort={this.props.isSort}
                    isClicked={this.props.isClicked}
                    query={this.props.query}
                  />
                </div>
              </Col>
            </Row>
          )}
        </>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ reducer, reducerSortSection }) => {
  return {
    attributes: reducer.attributes,
    attributesForSearch: reducerSortSection.attributesForSearch,
    arrayOfAllAtributes: reducerSortSection.arrayOfAllAtributes,
    category_id: reducer.category_id,
    isClicked: reducerSortSection.isClicked
  };
};

const mapDispatchToProps = dispatch => {
  return {
    highlightAttribute: attr => dispatch(highlightAttribute(attr)),
    unHighlightAttribute: attr => dispatch(unHighlightAttribute(attr)),
    deleteOneField: field => dispatch(deleteOneField(field)),
    deleteAllAttributes: () => dispatch(deleteAllAttributes()),
    isSort: bool => dispatch(clickShow(bool)),
    saveFoundProducts: num => dispatch(saveFoundProducts(num)),
    existSortAttributes: attr => dispatch(existSortAttributes(attr))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphQLAllAttributes
)(SortSection);
