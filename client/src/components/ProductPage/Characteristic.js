import React from "react";
import { ListGroup } from "react-bootstrap";

const Characteristic = ({ attributes }) => (
  <div className="characteristic_container">
    <h3>Характеристики</h3>
    {attributes.map((item, idx) => (
      <ListGroup key={idx} horizontal>
        <ListGroup.Item variant='success'>{item.name}</ListGroup.Item>
        <ListGroup.Item variant="dark">{item.value}</ListGroup.Item>
      </ListGroup>
    ))}
  </div>
);

export default Characteristic;
