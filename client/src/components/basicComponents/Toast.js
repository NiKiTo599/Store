import React from "react";
import { Toast } from "react-bootstrap";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class ToastComponent extends React.PureComponent {
  render() {
    const { notification } = this.props;
    return (
      <div
        style={{
          position: "fixed",
          top: "80%",
          right: "10%"
        }}
      >
        <Toast
          onClose={e => this.props.setShow(e, false)}
          show={this.props.show}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <FontAwesomeIcon icon={faShoppingCart} />
            <strong className="mr-auto">{notification.header}</strong>
            <small>прямо сейчас</small>
          </Toast.Header>
          <Toast.Body>
            <p>{notification.text}</p>
            <Link to={notification.link}>{notification.linkText}</Link>
          </Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default ToastComponent;
