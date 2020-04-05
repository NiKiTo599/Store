import React from "react";
import { Link } from "react-scroll";

import "./scroll.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";


const ScroolUp = ({scroll}) => (
  <>
    {scroll > 200 ? (
      <Link
        activeClass="active"
        to="header"
        spy={true}
        smooth={true}
        duration={500}
        delay={0}
      >
        <div className="scroll_up">
          <FontAwesomeIcon icon={faChevronUp} />
        </div>
      </Link>
    ) : null}
  </>
);

export default ScroolUp;
