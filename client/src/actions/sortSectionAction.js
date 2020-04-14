export const HIGHLIGHT_ATTRIBUTE = "HIGHLIGHT_ATTRIBUTE",
  UNHIGHLIGHT_ATTRIBUTE = "UNHIGHLIGHT_ATTRIBUTE",
  DELETE_ONE_FIELD = "DELETE_ONE_FIELD",
  DELETE_ALL_ATTRIBUTES = "DELETE_ALL_ATTRIBUTES",
  CLICK_SHOW_SELECTION = "CLICK_SHOW_SELECTION",
  SAVE_FOUND_PRODUCTS = "SAVE_FOUND_PRODUCTS",
  EXIST_SORT_ATTRIBUTES = "EXIST_SORT_ATTRIBUTES",
  SAVE_PRICES = "SAVE_PRICES";

export function highlightAttribute(attr) {
  return {
    type: HIGHLIGHT_ATTRIBUTE,
    attr,
  };
}

export function unHighlightAttribute(attr) {
  return {
    type: UNHIGHLIGHT_ATTRIBUTE,
    attr,
  };
}

export function deleteOneField(field) {
  return {
    type: DELETE_ONE_FIELD,
    field,
  };
}

export function deleteAllAttributes() {
  return {
    type: DELETE_ALL_ATTRIBUTES,
  };
}

export function clickShow(bool) {
  return {
    type: CLICK_SHOW_SELECTION,
    bool,
  };
}

export function saveFoundProducts(num) {
  return {
    type: SAVE_FOUND_PRODUCTS,
    num,
  };
}

export function existSortAttributes(attr) {
  return {
    type: EXIST_SORT_ATTRIBUTES,
    isExist: !!attr,
  };
}

export function savePrices(prices) {
  return {
    type: SAVE_PRICES,
    prices,
  };
}
