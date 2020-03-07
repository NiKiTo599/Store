export const HIGHLIGHT_ATTRIBUTE = "HIGHLIGHT_ATTRIBUTE",
  UNHIGHLIGHT_ATTRIBUTE = "UNHIGHLIGHT_ATTRIBUTE",
  DELETE_ONE_FIELD = "DELETE_ONE_FIELD",
  GET_ONLY_SELECTION_PRODUCTS = "GET_ONLY_SELECTION_PRODUCTS",
  CLICK_SHOW_SELECTION = "CLICK_SHOW_SELECTION";

export function highlightAttribute(attr) {
  return {
    type: HIGHLIGHT_ATTRIBUTE,
    attr
  };
}

export function unHighlightAttribute(attr) {
  return {
    type: UNHIGHLIGHT_ATTRIBUTE,
    attr
  };
}

export function deleteOneField(field) {
  return {
    type: DELETE_ONE_FIELD,
    field
  };
}

function getOnlySelectionProducts(products) {
  return {
    type: GET_ONLY_SELECTION_PRODUCTS,
    products
  };
}

export function clickShow(bool) {
  return {
    type: CLICK_SHOW_SELECTION,
    bool
  };
}
