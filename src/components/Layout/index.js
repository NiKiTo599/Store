import React from "react";

import "./index.scss";
import NavigtionCategories from "../Home/NavCategories/NavigtionCategories";
import ContainerForSerch from "../Search/Container";
import Header from "./Header";
import Footer from "./Footer";
import ScrollUp from "../basicComponents/ScrollUp";
import Helmet from "react-helmet";
import logo from "../../data/images/logo.png";

class Layout extends React.PureComponent {
  constructor(props) {
    super(props);
    window.addEventListener("resize", (e) =>
      this.setState({
        width: window.screen.width,
      })
    );
    window.addEventListener("scroll", () =>
      this.setState({ scroll: window.pageYOffset })
    );
  }

  state = {
    width: window.screen.width,
    scroll: 0,
  };

  render() {
    const { children } = this.props;
    const { width } = this.state;
    return (
      <>
        <Helmet
          encodeSpecialCharacters={true}
          titleTemplate="Electronics.by - %s"
          defaultTitle="Магазин электроники"
        >
          <html lang="ru" amp />

          {/* body attributes */}
          <body className="root" />

          {/* title attributes and value */}
          <title itemProp="name" lang="ru">
            Магазин электроники где вы найдёте все
          </title>

          {/* multiple meta elements */}
          <meta name="description" content="Helmet application" />
          <meta property="og:type" content="article" />
          <link rel="icon" href="https://tehnocentr.ru/images/search.gif" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Comfortaa:400,700&display=swap&subset=cyrillic-ext"
            rel="stylesheet"
          ></link>
        </Helmet>

        <Header width={width} />
        <main className="main">
          <NavigtionCategories width={width} />

          <section className="container-for-main">
            <ContainerForSerch width={width} />
            {children}
          </section>
        </main>
        <Footer />
        <ScrollUp scroll={this.state.scroll} />
      </>
    );
  }
}

export default Layout;
