import React from "react";

const Description = ({ descriptions }) => (
  <div className="description_container">
    <h3>Описание</h3>
    {
      descriptions.map((item, index) => descriptions.length - 1 === index ? null : <p key={index}>{item}</p>)
    }
  </div>
);

export default Description;
