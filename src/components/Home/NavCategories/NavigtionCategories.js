import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import "./index.scss";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchCategories } from './../../../actions'


class NavigtionCategories extends React.Component {

  componentDidMount = () => {
    this.props.fetchCategories('/productCategories');
  };

  /* fetchCategories = () => {
    return fetch("/productCategories")
      .then(data => data.json())
      .then(data => {
        const obj = {};
        data
          .filter(item => !item.parent_id)
          .forEach(item => {
            obj[item.name] = [];
          });
        data.forEach(item => {
          if (item.meta_description !== item.name) {
            obj[item.meta_description].push(item);
          }
        });
        return obj;
      })
      .then(data => this.setState({ categories: data }));
  }; */

  handleClick = (e) => {
    const { currentTarget } = e;
    currentTarget.children[2].classList.toggle('displayNone')
  }

  render() {
    const keys = Object.keys(this.props.categories);
    return (
      <ul className="categories-list">
        {keys.map(item => (
          <li className="list__main-item" onClick={this.handleClick}>
            <span>{item}</span><FontAwesomeIcon icon={faAngleDown}/>
            <ul className="sub-list displayNone" onClick={e => e.preventDefault()}>
              {this.props.categories[item].map(subItem => (
                <li className="sub-list__item"><Link to={`/products/?query=${subItem.slug}`}>{subItem.name}</Link></li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = ({ reducer }) => {
  console.log(reducer)
  return {
    categories: reducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: (url) => dispatch(fetchCategories(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigtionCategories);
