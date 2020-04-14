import React from "react";
import AttributeSortButton from "./AttributeSortButton";
import HideMenu from "../../basicComponents/HideMenu";

import InputRange from "react-input-range";

const makeACheckAttribute = (
  { target, currentTarget },
  highlightAttribute,
  unHighlightAttribute
) => {
  if (target.classList.contains("attribute")) {
    if (target.checked) {
      const key = currentTarget.querySelector("h6").innerHTML;
      highlightAttribute({ [key]: [target.nextSibling.innerHTML] });
    } else {
      const key = currentTarget.querySelector("h6").innerHTML;
      unHighlightAttribute({ [key]: [target.nextSibling.innerHTML] });
    }
  }
  /*else if (!target.classList.contains("sort-attribute")) {
    const collectionOfAttributes = currentTarget.querySelectorAll(
      ".highlight"
    );
    for (let i = 0; i < collectionOfAttributes.length; i++) {
      collectionOfAttributes[i].classList.toggle("highlight", false);
    }
    this.props.deleteOneField(currentTarget.querySelector("b").innerHTML);
  }*/
};

const SortSectionForMobile = ({
  nameOfCategoryOfAttributes,
  attributes,
  saveFoundProducts,
  isSort,
  arrayOfAllAtributes,
  isClicked,
  query,
  highlightAttribute,
  unHighlightAttribute,
  closeSort,
  productsAttributes,
  /* changeForPrice, */
  state,
  /* prices,
  propsPrices */
}) => (
  <HideMenu title="Фильтры" hiddenClass="hide_sort">
    {nameOfCategoryOfAttributes.map((elem, idx) => (
      <div
        onClick={(e) =>
          makeACheckAttribute(e, highlightAttribute, unHighlightAttribute)
        }
        className="container_for_sort-attribute"
      >
        <h6>{elem}</h6>
        {attributes[elem].map((item, index) => (
          <>
            <input
              className="attribute"
              variant="success"
              type="checkbox"
              id={`${idx}${index}`}
            />
            <label for={`${idx}${index}`}>{item}</label>
          </>
        ))}
      </div>
    ))}
    {/* <div className="range_prices">
      <p className="sort-attribute">Ценовой интервал:</p>
      <InputRange
        maxValue={prices.max}
        minValue={prices.min}
        value={state.value ? state.value : prices}
        onChange={(value) => changeForPrice(value)}
        step={500}
      />
    </div> */}
    <AttributeSortButton
      saveFoundProducts={saveFoundProducts}
      arrayOfAllAtributes={arrayOfAllAtributes}
      isSort={isSort}
      isClicked={isClicked}
      query={query}
      /* prices={propsPrices}
      primaryPrices={prices}
      secondaryPrices={state.value ? state.value : prices} */
    />
  </HideMenu>
);

export default SortSectionForMobile;
