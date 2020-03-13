import React from "react";
import { Link } from "react-router-dom";
import logo from "../../data/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";
import NavigtionCategories from "../Home/NavCategories/NavigtionCategories";
import Search from "../Search/Search";
import Header from "./Header";

const Layout = ({ children }) => (
  <>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
    <link href="https://fonts.googleapis.com/css?family=Alegreya+Sans:400,400i,700&display=swap" rel="stylesheet"></link>
    <Header />
    <main className="main">
      <aside className="container-categories">
        <NavigtionCategories />
      </aside>
      <section className="container-for-main">
        <Search />
        {children}
      </section>
    </main>
    <footer></footer>
  </>
);

export default Layout;
