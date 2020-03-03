export const HIGHLIGHT_ATTRIBUTE = "HIGHLIGHT_ATTRIBUTE",
  UNHIGHLIGHT_ATTRIBUTE = "UNHIGHLIGHT_ATTRIBUTE",
  DELETE_ONE_FIELD = "DELETE_ONE_FIELD",
  GET_ONLY_SELECTION_PRODUCTS = "GET_ONLY_SELECTION_PRODUCTS";

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

export function fetchOnlySelectionProducts(url, fields) {
  console.log(fields, JSON.stringify(fields))
  return dispatch => {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fields)
    })
      .then(data => data.json())
      .then(data => dispatch(getOnlySelectionProducts(data)));
  };
}
