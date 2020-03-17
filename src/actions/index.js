export const GET_CATEGORIES = "GET_CATEGORIES",
  SAVE_PRODUCT_CATEGORY_ID = "SAVE_PRODUCT_CATEGORY_ID",
  GET_COUNT = "GET_COUNT",
  GET_ONE_PRODUCT = "GET_ONE_PRODUCT",
  GET_ATTRIBUTES = "GET_ATTRIBUTES",
  SAVE_PRODUCTS = "SAVE_PRODUCTS";

export function saveProductCategoriesID(category_id, page) {
  return {
    type: SAVE_PRODUCT_CATEGORY_ID,
    category_id,
    page
  };
}

export function saveProducts(products) {
  return {
    type: SAVE_PRODUCTS,
    products
  };
}

export function saveCategories(data) {
  const obj = {};
  data
    .filter(item => !item.parent_id)
    .forEach(item => {
      obj[item.name] = [];
    });
  data.forEach(item => {
    if (item.meta_description !== item.name) {
      obj[item.meta_description].push(item);
    } else if (item.name === 'Запчасти для бытовой техники' || item.name === 'Различные блоки питания') {
      obj[item.meta_description].push(item);
    }
  });
  return {
    type: GET_CATEGORIES,
    items: obj
  };
}

function getCount(item) {
  return {
    type: GET_COUNT,
    item
  };
}

export function getOneProduct(id) {
  return {
    type: GET_ONE_PRODUCT,
    id
  };
}

function getAttributes(attr) {
  return {
    type: "GET_ATTRIBUTES",
    attr
  };
}

export function fetchCount(url) {
  return dispatch => {
    fetch(url)
      .then(data => data.json())
      .then(data => dispatch(getCount(data)));
  };
}

export function fetchAttributes(url) {
  return dispatch => {
    fetch(url)
      .then(data => data.json())
      .then(data => dispatch(getAttributes(data)));
  };
}
