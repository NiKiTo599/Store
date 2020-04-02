import React from "react";
import { OverlayTrigger } from "react-bootstrap";

const TooltipComponent = ({ children, text }) => (
  <OverlayTrigger
    placement="right-start"
    delay={{ show: 250, hide: 400 }}
    overlay={
      <div
        style={{
          backgroundColor: "var(--success)",
          padding: "2px 5px",
          color: "white",
          borderRadius: 3,
          zIndex: 20
        }}
      >
        {text}
      </div>
    }
  >
    {children}
  </OverlayTrigger>
);

export default TooltipComponent;
