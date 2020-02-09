import React, { Component } from "react";
import { Link } from "react-router-dom";

import './index.scss'

const Layout = ({ children }) => (
  <>
    <header className="header">
      <nav className="container-nav">
        <Link className="container-nav__link" to="/home">Главная</Link>
        <Link className="container-nav__link" to="/cat">Категории</Link>
      </nav>
    </header>
    <main>{children}</main>
    <footer></footer>
  </>
);

export default Layout;
