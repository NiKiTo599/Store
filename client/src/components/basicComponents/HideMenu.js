import React from "react";

import "./hidemenu.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const showMenu = (hiddenClass, width) => {
  let w = width ? width : 500;
  const hideMenu = document.querySelector(`.${hiddenClass}`);
  if (hideMenu && w < 900) {
    //document.querySelector("body").classList.toggle("goLeft");
    hideMenu.classList.toggle("hide_menu-to-left");
  }
};

const HideMenu = ({ children, hiddenClass, title }) => (
  <div className={`hide_menu ${hiddenClass}`}>
    <h5>{title}</h5>
    <FontAwesomeIcon onClick={() => showMenu(hiddenClass)} icon={faTimes} />
    {children}
  </div>
);

export default HideMenu;
