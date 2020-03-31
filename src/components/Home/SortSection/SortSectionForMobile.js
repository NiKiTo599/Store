import React from "react";
import AttributeSortButton from "./AttributeSortButton";
import HideMenu from "../../basicComponents/HideMenu";

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
  closeSort
}) => (
  <HideMenu title="Фильтры" hiddenClass="hide_sort">
    {nameOfCategoryOfAttributes.map((elem, idx) => (
      <div
        onClick={e =>
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
    <AttributeSortButton
      saveFoundProducts={saveFoundProducts}
      arrayOfAllAtributes={arrayOfAllAtributes}
      isSort={isSort}
      isClicked={isClicked}
      query={query}
    />
  </HideMenu>
);

export default SortSectionForMobile;
