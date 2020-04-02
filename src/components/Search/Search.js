import React from "react";
import { connect } from "react-redux";
import AutoSuggest from "react-autosuggest";

import { graphql } from "react-apollo";
import { compose } from "recompose";
import { searchProducts } from "./queries";

import "./search.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const graphQLSearchProducts = graphql(searchProducts, {
  options: ({ name }) => {
    return {
      variables: {
        name
      }
    };
  }
});

const getSuggestionValue = suggestion => suggestion.name;

const rendersuggestion = suggestion => (
  <Link
    style={{
      textDecoration: "none"
    }}
    to={`/product?id=${suggestion._id}`}
  >
    <div className="react-autosuggest__suggestion">
      <img
        className="image-of-product"
        src={require(`../../data/images/${suggestion.category_id}/${suggestion.images[0].filename}.png`)}
        alt=""
      />
      <div className="suggest-info">
        <p className="suggestion-title">{suggestion.name}</p>
        <p className="suggestion-price">{suggestion.regular_price}</p>
      </div>
      <FontAwesomeIcon icon={faChevronRight}/>
    </div>
  </Link>
);

const renderInputComponent = inputProps => (
  <div className="container-for-search-bar">
    <input {...inputProps} className="search-bar" />
  </div>
);

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: []
    };
  }

  getSuggestions = value => {
    const inputLength = value.trim().toLowerCase().length;
    return inputLength === 0 || !this.props.data.searchProducts
      ? []
      : this.props.data.searchProducts;
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  /* onSuggestionHighlighted = ({ suggestion }) => {
    //console.log(suggestion)
  } */

  onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    window.location.assign(`/product?id=${suggestion._id}`)
  }

  render() {
    const { suggestions } = this.state;
    const { handleChange, name, width } = this.props;
    const inputProps = {
      placeholder: "Я ищу...",
      value: name,
      onChange: handleChange,
      width: width
    };
    return (
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={rendersuggestion}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent}
        /* onSuggestionHighlighted={this.onSuggestionHighlighted} */
        onSuggestionSelected={this.onSuggestionSelected}
        alwaysRenderSuggestions={true}
      />
    );
  }
}

const mapStateToProps = ({ reducer }) => {
  return {
    products: reducer.products,
    categories: reducer.categories
  };
};

/*const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: url => dispatch(fetchProducts(url))
  };
};*/

export default compose(connect(mapStateToProps), graphQLSearchProducts)(Search);
