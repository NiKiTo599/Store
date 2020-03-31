import React from "react";
import { connect } from "react-redux";
import AutoSuggest from "react-autosuggest";

import { graphql } from "react-apollo";
import { compose } from "recompose";
import { searchProducts } from "./queries";

import "./search.scss";

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
