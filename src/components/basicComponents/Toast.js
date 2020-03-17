import React from "react";
import { Toast } from "react-bootstrap";

class ToastComponent extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          position: "fixed",
          top: "90%",
          right: "10%"
        }}
      >
        <Toast
          onClose={() => this.props.setShow(false)}
          show={this.props.show}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="mr-auto">Bootstrap</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>See? Just like this.</Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default ToastComponent;
