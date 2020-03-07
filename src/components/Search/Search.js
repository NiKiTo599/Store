import React from "react";
import { connect } from "react-redux";
//import { fetchProducts } from "./../../actions";
import AutoSuggest from "react-autosuggest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./search.scss";

const getSuggestionValue = suggestion => suggestion.name;

const rendersuggestion = suggestion => (
  <div className="container-for-suggestion">
    <img
      className="image-of-product"
      src={require(`../../data/images/${suggestion.category_id}/${suggestion.images[0].filename}.png`)}
      alt=""
    />
    <div className="suggest-info">
      <p className="suggestion-title">{suggestion.name}</p>
      <p className="suggestion-price">{suggestion.regular_price}</p>
    </div>
  </div>
);

const renderInputComponent = inputProps => (
  <div className="container-for-search-bar">
    <input {...inputProps} className="search-bar" />
    <FontAwesomeIcon icon={faSearch} />
  </div>
);

class Search extends React.Component {
  constructor(props) {
    super(props);
    //this.categories = this.props.categories;
    this.state = {
      valueForSearch: "",
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.props.fetchProducts(`/search?query=${newValue}&page=1`);
    this.setState({
      valueForSearch: newValue
    });
  };

  getSuggestions = value => {
    const inputLength = value.trim().toLowerCase().length;
    return inputLength === 0 || !this.props.products ? [] : this.props.products;
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

  /*makeSuggestionsFromCategories = () => {
    let arrayOfCategories = [];
    for (let key in this.props.products) {
      arrayOfCategories = arrayOfCategories.concat(this.props.categories[key]);
    }
    return arrayOfCategories;
  };*/

  render() {
    //this.products = this.makeSuggestionsFromCategories();
    const { suggestions, valueForSearch } = this.state;
    const inputProps = {
      placeholder: "Я ищу...",
      value: valueForSearch,
      onChange: this.onChange
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

export default connect(mapStateToProps)(Search);
