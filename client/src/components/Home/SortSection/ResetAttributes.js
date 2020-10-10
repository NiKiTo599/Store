import React from "react";
import { Button } from "react-bootstrap";

const resetAllAttributes = (deleteAllAttributes) => {
  const allAttributes = document.querySelectorAll(".highlight");
  for (let i = 0; i < allAttributes.length; i++) {
    allAttributes[i].classList.toggle("highlight", false);
  }
  deleteAllAttributes();
};

const ResetAttributes = ({
  isClicked,
  arrayOfAllAtributes,
  deleteAllAttributes,
}) => (
  <>
    {isClicked || arrayOfAllAtributes.length === 0 ? null : (
      <div className="container_for_reset_attributes">
        <Button variant="success" onClick={() => resetAllAttributes(deleteAllAttributes)}>Сбросить фильтры</Button>
      </div>
    )}
  </>
);

export default ResetAttributes;
