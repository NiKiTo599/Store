import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCategories } from "./../../../actions";

class NavigtionCategories extends React.Component {
  componentDidMount = () => {
    this.props.fetchCategories("/productCategories");
  };

  handleClick = e => {
    const { currentTarget } = e;
    currentTarget.children[2].classList.toggle("displayNone");
  };

  render() {
    if (this.props.categories) {
      const keys = Object.keys(this.props.categories);
      return keys.length > 1 ? (
        <ul className="categories-list">
          {keys.map(item => (
            <li className="list__main-item" onClick={this.handleClick}>
              <span>{item}</span>
              <FontAwesomeIcon icon={faAngleDown} />
              <ul
                className="sub-list displayNone"
                onClick={e => e.stopPropagation()}
              >
                {this.props.categories[item].map(subItem => (
                  <li className="sub-list__item">
                    <Link to={`/home?query=${subItem._id}`}>
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : null;
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ reducer}) => {
  return {
    categories: reducer.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: url => dispatch(fetchCategories(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigtionCategories);
