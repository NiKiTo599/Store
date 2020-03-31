import React from "react";
import { Link } from "react-router-dom";
import logo from "../../data/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBars,
  faFilter,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { showMenu } from "../basicComponents/HideMenu";

const showSearchBar = () => {
  document
    .querySelector(".container-for-search-bar")
    .classList.toggle("display");
};

const Header = ({ cart, width }) => (
  <header className="header">
    <nav className="container-nav">
      {width <= 768 ? (
        <div
          className="container-nav__link"
          onClick={() => showMenu("hide_nav_categories")}
        >
          <FontAwesomeIcon className="nav-link__menu" icon={faBars} />
        </div>
      ) : null}
      <Link className="container-nav__link margin-left" to="/home">
        <img className="nav-logo" src={logo} alt="logo" />
      </Link>
      <div className="container_for_instruments">
        {width <= 768 ? (
          <div className="nav-cart">
            <FontAwesomeIcon
              onClick={() => showMenu("hide_sort")}
              icon={faFilter}
            />
          </div>
        ) : null}
        {width <= 425 ? (
          <div className="nav-cart">
            <FontAwesomeIcon
              onClick={showSearchBar}
              icon={faSearch}
            />
          </div>
        ) : null}
        <Link className="container-nav__link" to="/cart">
          <div className="nav-cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>
              {width <= 768
                ? cart.length === 0
                  ? 0
                  : cart.length
                : cart.length === 0
                ? "У вас пустая корзина"
                : `В корзине ${cart.length} товара`}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  </header>
);

const mapStateToProps = ({ reducerCart }) => {
  return {
    cart: reducerCart.cart
  };
};

export default connect(mapStateToProps)(Header);
