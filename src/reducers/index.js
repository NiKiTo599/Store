import {
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_COUNT,
  GET_ONE_PRODUCT,
  GET_ATTRIBUTES
} from "./../actions";
import { ADD_TO_CART } from "../actions/actionsCart";

const initialState = {
  cart: []
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, {
        categories: action.items
      });
    case GET_PRODUCTS:
      return Object.assign({}, state, { products: action.products });
    case GET_COUNT:
      return Object.assign({}, state, { count: action.item });
    case GET_ONE_PRODUCT:
      return Object.assign({}, state, {
        currentProduct: action.item
      });
    case GET_ATTRIBUTES:
      return Object.assign({}, state, { attributes: action.attr });
    default:
      return state;
  }
}

export function reducerCart (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: 
      const arr = state.cart.slice();
      arr.push(action.item)
      console.log(arr)
      return Object.assign({}, state, { cart: arr });
    default:
      return state;
  }
}
