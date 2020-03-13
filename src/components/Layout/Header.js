import React from "react";
import { Link } from "react-router-dom";
import logo from "../../data/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

const Header = ({ cart }) => (
  <header className="header">
    <nav className="container-nav">
      <Link className="container-nav__link" to="/home">
        <img className="nav-logo" src={logo} alt="logo" />
      </Link>
      <Link className="container-nav__link" to="/cart">
        <div className="nav-cart">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>{cart.length === 0 ? "У вас пустая корзина" : `В корзине ${cart.length} товара`}</span>
        </div>
      </Link>
    </nav>
  </header>
);

const mapStateToProps = ({ reducerCart }) => {
  return {
    cart: reducerCart.cart
  };
};

export default connect(mapStateToProps)(Header);
