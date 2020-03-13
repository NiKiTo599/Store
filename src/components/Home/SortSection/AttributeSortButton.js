import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { graphql } from "react-apollo";
import { compose } from "recompose";
import { countOfFindProducts } from "./queries";

const graphQLSortByAttribute = graphql(countOfFindProducts, {
  options: ({ arrayOfAllAtributes }) => {
    return {
      variables: {
        attr: arrayOfAllAtributes
      }
    };
  }
});

class AttributeSortButton extends React.Component {
  handleClickButton = () => {
    if (!this.props.isClicked) {
      this.props.isSort(!this.props.isClicked);
      this.props.saveFoundProducts(this.props.data.attributeSortCount);
    } else {
      this.props.isSort(!this.props.isClicked);
      this.props.saveFoundProducts(undefined);
    }
  };

  render() {
    return this.props.arrayOfAllAtributes.length !== 0 ? (
      <>
        <Link to={`/home?query=${this.props.query}&page=1`}>
          <Button onClick={this.handleClickButton} variant="success">
            {this.props.isClicked ? "Сбросить фильтры" : "Показать выбранные"}
          </Button>
        </Link>

        <p>Найдено {this.props.data.attributeSortCount}</p>
      </>
    ) : null;
  }
}

export default compose(graphQLSortByAttribute)(AttributeSortButton);
