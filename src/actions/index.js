export const GET_CATEGORIES = "GET_CATEGORIES",
  GET_PRODUCTS = "GET_PRODUCTS",
  GET_IMAGES = "GET_IMAGES";

function getProducts(products) {
  return {
    type: GET_PRODUCTS,
    products
  };
}

function getCategories(items) {
  return {
    type: GET_CATEGORIES,
    items
  };
}

function getImages(img) {
  return {
    type: GET_IMAGES,
    img
  };
}

export function fetchCategories(url) {
  return dispatch => {
    fetch(url)
      .then(data => data.json())
      .then(data => {
        const obj = {};
        data
          .filter(item => !item.parent_id)
          .forEach(item => {
            obj[item.name] = [];
          });
        data.forEach(item => {
          if (item.meta_description !== item.name) {
            obj[item.meta_description].push(item);
          }
        });
        return obj;
      })
      .then(data => dispatch(getCategories(data)));
  };
}

export function fetchProducts(url) {
  return dispatch => {
    fetch(url)
      .then(data => data.json())
      .then(data => dispatch(getProducts(data)));
  };
}
