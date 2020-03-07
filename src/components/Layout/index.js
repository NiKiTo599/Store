import React from "react";
import { Link } from "react-router-dom";
import logo from "../../data/images/logo.png";

import "./index.scss";
import NavigtionCategories from "../Home/NavCategories/NavigtionCategories";
import Search from "../Search/Search";

const Layout = ({ children }) => (
  <>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
    <header className="header">
      <nav className="container-nav">
        <Link className="container-nav__link" to="/home">
          <img className="nav-logo" src={logo} alt="logo" />
        </Link>
        <Link className="container-nav__link" to="/cart">
          Корзина
        </Link>
      </nav>
    </header>
    <main className="main">
      <aside className="container-categories">
        <NavigtionCategories />
      </aside>
      <section className="container-for-main">{children}</section>
    </main>
    <footer></footer>
  </>
);

export default Layout;
