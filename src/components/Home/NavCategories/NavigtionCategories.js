import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { saveCategories } from "./../../../actions";

import { graphql } from "react-apollo";
import { compose } from "recompose";
import { categoriesQuery } from "./queries";
import HideMenu from "../../basicComponents/HideMenu";

class NavigtionCategories extends React.Component {
  shouldComponentUpdate = () => {
    if (this.props.categories) {
      return false;
    } else {
      return true;
    }
  };

  componentDidMount = () => {
    if (this.props.data.categories) {
      this.props.saveCategories(this.props.data.categories);
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.data.categories !== this.props.data.categories) {
      this.props.saveCategories(this.props.data.categories);
    }
  };

  handleClick = e => {
    const { currentTarget } = e;
    currentTarget.children[2].classList.toggle("maxHeight");
  };

  /*showCategories = () => {
    const categories = document.querySelector('.container-categories');
    categories.classList.toggle('displayFlex')
  }*/

  render() {
    const { width } = this.props;
    if (this.props.categories) {
      const keys = Object.keys(this.props.categories);
      const navCatComponent = (
        <aside className="container-categories">
          <ul className="categories-list">
            {keys.map((item, idx) => (
              <>
                {this.props.categories[item].length !== 1 ? (
                  <li
                    key={idx * Math.random() * 100}
                    className="list__main-item"
                    onClick={this.handleClick}
                  >
                    <span>{item}</span>
                    <div className="container-for-svg">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    <ul className="sub-list" onClick={e => e.stopPropagation()}>
                      {this.props.categories[item].map((subItem, index) => (
                        <li
                          key={index * Math.random() * 100}
                          className="sub-list__item"
                        >
                          <Link
                            className="nav__link"
                            key={index * Math.random() * 100}
                            to={`/home?query=${subItem._id}&page=1&selection=false`}
                          >
                            <FontAwesomeIcon icon={faChevronRight} />
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li
                    key={idx * Math.random() * 100}
                    className="list__main-item"
                  >
                    <Link
                      className="nav__link"
                      to={`/home?query=${this.props.categories[item][0]._id}&page=1&selection=false`}
                    >
                      <span>{item}</span>
                    </Link>
                  </li>
                )}
              </>
            ))}
          </ul>
        </aside>
      );
      return keys.length > 1 ? (
        <>
          {width <= 900 ? (
            <HideMenu title="Категории" hiddenClass="hide_nav_categories">
              {navCatComponent}
            </HideMenu>
          ) : (
            navCatComponent
          )}
        </>
      ) : null;
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ reducer }) => {
  return {
    categories: reducer.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveCategories: items => dispatch(saveCategories(items))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(categoriesQuery)
)(NavigtionCategories);
