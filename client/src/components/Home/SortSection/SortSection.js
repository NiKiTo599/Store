import React from "react";

import { connect } from "react-redux";
import {
  highlightAttribute,
  unHighlightAttribute,
  deleteOneField,
  clickShow,
  saveFoundProducts,
  deleteAllAttributes,
  existSortAttributes,
} from "./../../../actions/sortSectionAction";
//import InputRange from "react-input-range";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { graphql } from "react-apollo";
import { compose } from "recompose";
import { allAttributesQuery } from "./queries";

import "./sort.scss";
import "../../../../node_modules/react-input-range/lib/css/index.css";
import AttributeSortButton from "./AttributeSortButton";
import TooltipComponent from "../../basicComponents/Toottips";
import { Row, Col } from "react-bootstrap";
import SortSectionForMobile from "./SortSectionForMobile";

const graphQLAllAttributes = graphql(allAttributesQuery, {
  options: ({ category_id }) => {
    return {
      variables: {
        category_id,
      },
    };
  },
});

class SortSection extends React.Component {
  //state = { value: null };
  componentDidUpdate = (prevProps) => {
    if (this.props.query !== prevProps.query) {
      this.props.deleteAllAttributes();
    }
  };
  getAttributesFromData = () => {
    const { productsAttributes } = this.props.data;
    const allAtributesOfProducts = {};
    productsAttributes.forEach((elem) => {
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

  sortAttributes = (objectOfAttributes) => {
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

  /* changeForPrice = (value) => {
    this.props.savePrices(value);
    this.setState({ value });
  };

  onChangeInputPrice = (target, { min, max }) => {
    if (target.id === "from") {
      this.setState({
        value: {
          min: target.value >= min && target.value <= max ? +target.value : min,
          max: this.state.value ? this.state.value.max : max,
        },
        inputMin:
          target.value >= min && target.value <= max ? +target.value : min,
      });
      target.value =
        target.value >= min && target.value <= max ? target.value : min;
    } else {
      this.setState({
        value: {
          max: target.value <= max && target.value >= min ? +target.value : max,
          min: this.state.value ? this.state.value.min : min,
        },
        inputMax:
          target.value <= max && target.value >= min ? +target.value : max,
      });
      target.value =
        target.value <= max && target.value >= min ? target.value : max;
    }
    this.props.savePrices(this.state.value);
  };

  eventInputs = (prices) => {
    window.addEventListener("load", () => {
      const from = document.querySelector("#from");
      const to = document.querySelector("#to");
      if (from && to) {
        from.addEventListener("change", ({ target }) =>
          this.onChangeInputPrice(target, prices)
        );
        to.addEventListener("change", ({ target }) =>
          this.onChangeInputPrice(target, prices)
        );
      }
    });
  }; */

  render() {
    const { width } = window.screen;
    const { productsAttributes } = this.props.data;
    if (productsAttributes) {
      /* const prices = {
        max: +productsAttributes[productsAttributes.length - 1].regular_price,
        min: +productsAttributes[0].regular_price,
      }; */
      //this.eventInputs(prices);
      this.props.existSortAttributes(productsAttributes);
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
              productsAttributes={productsAttributes}
              changeForPrice={this.changeForPrice}
              state={this.state}
              propsPrices={this.props.prices}
              /* prices={prices} */
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
                  {/* <div className="range_prices">
                    <p className="sort-attribute">Ценовой интервал:</p>
                    <div className="sort-attribute__ways_to_choose_price">
                      <div className="ways_to_choose_price__manual">
                        <span>От</span>
                        <input
                          id="from"
                          type="text"
                          min={prices.min}
                          max={prices.max}
                          placeholder={
                            this.state.value
                              ? this.state.value.min
                              : prices.min
                          }
                          className="prices_input"
                        />
                        <span>До</span>
                        <input
                          id="to"
                          type="text"
                          className="prices_input"
                          min={prices.min}
                          max={prices.max}
                          placeholder={
                            this.state.value
                              ? this.state.value.max
                              : prices.max
                          }
                        />
                      </div>
                      <InputRange
                        maxValue={prices.max}
                        minValue={prices.min}
                        value={this.state.value ? this.state.value : prices}
                        onChange={(value) => this.changeForPrice(value)}
                        step={100}
                      />
                    </div>
                  </div> */}

                  <AttributeSortButton
                    saveFoundProducts={this.props.saveFoundProducts}
                    arrayOfAllAtributes={this.props.arrayOfAllAtributes}
                    prices={this.props.prices}
                    isSort={this.props.isSort}
                    isClicked={this.props.isClicked}
                    query={this.props.query}
                    /* primaryPrices={prices}
                    secondaryPrices={
                      this.state.value ? this.state.value : prices
                    } */
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
    isClicked: reducerSortSection.isClicked,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    highlightAttribute: (attr) => dispatch(highlightAttribute(attr)),
    unHighlightAttribute: (attr) => dispatch(unHighlightAttribute(attr)),
    deleteOneField: (field) => dispatch(deleteOneField(field)),
    deleteAllAttributes: () => dispatch(deleteAllAttributes()),
    isSort: (bool) => dispatch(clickShow(bool)),
    saveFoundProducts: (num) => dispatch(saveFoundProducts(num)),
    existSortAttributes: (attr) => dispatch(existSortAttributes(attr)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphQLAllAttributes
)(SortSection);
