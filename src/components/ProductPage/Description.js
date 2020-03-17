import React from "react";

const makeADecriptionText = text => {
  const index = text.indexOf(":");
  return ~index ? (
    <>
      <span>{text.slice(0, index + 1)}</span>
      {text.slice(index + 1)}
    </>
  ) : text;
};

const Description = ({ descriptions }) => (
  <div className="description_container">
    <h3>Описание</h3>
    {descriptions.map((item, index) =>
      descriptions.length - 1 === index ? null : (
        <p key={index}>{makeADecriptionText(item)}</p>
      )
    )}
  </div>
);

export default Description;
