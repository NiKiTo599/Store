import React from "react";

import "./index.scss";
import NavigtionCategories from "../Home/NavCategories/NavigtionCategories";
import ContainerForSerch from "../Search/Container";
import Header from "./Header";
import Footer from "./Footer";

class Layout extends React.PureComponent {
  constructor(props) {
    super(props);
    window.addEventListener("resize", e =>
      this.setState({
        width: window.screen.width
      })
    );
  }

  state = {
    width: window.screen.width
  };

  render() {
    const { children } = this.props;
    const { width } = this.state;
    return (
      <>
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
        <Header width={width} />
        <main className="main">
          <NavigtionCategories width={width} />

          <section className="container-for-main">
            <ContainerForSerch width={width} />
            {children}
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default Layout;
