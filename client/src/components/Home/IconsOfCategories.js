import React from "react";

import "./iconsCat.scss";

import json from "./../../data/dataCategories.json";
import { Link } from "react-router-dom";

const IconsOfCategories = () => (
  <section className="section_for_categories row justify-content-center">
    {json.categories.map((item) => (
      <div className="categories_item_view col-xl-3">
        <Link to={`/home?query=${item.id}&page=1&selection=false`}>
          <img
            className="categories__img"
            src={require(`../../data/images/Categories/${item.img}.png`)}
            alt={item.name}
          />
          <h6>{item.name}</h6>
        </Link>
      </div>
    ))}
  </section>
);

export default IconsOfCategories;
