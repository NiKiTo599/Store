import { GET_CATEGORIES, GET_PRODUCTS, GET_IMAGES } from "./../actions";

const initialState = {};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, {
        categories: action.items
      });
    case GET_PRODUCTS:
      return Object.assign({}, state, { products: action.products });
    default:
      return state;
  }
}
