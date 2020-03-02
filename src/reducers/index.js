import {
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_COUNT,
  GET_ONE_PRODUCT,
  GET_ATTRIBUTES
} from "./../actions";
import { ADD_TO_CART, DELETE_FROM_CART } from "../actions/actionsCart";
import {
  HIGHLIGHT_ATTRIBUTE,
  UNHIGHLIGHT_ATTRIBUTE,
  DELETE_ONE_FIELD,
  GET_ONLY_SELECTION_PRODUCTS
} from "../actions/sortSectionAction";

const initialState = {
  cart: sessionStorage.getItem("cart")
    ? JSON.parse(sessionStorage.getItem("cart"))
    : [],
  attributesForSearch: {},
  selectedProducts: []
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

export function reducerCart(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      let arr = state.cart.slice();
      arr.push(action.item);
      sessionStorage.setItem("cart", JSON.stringify(arr));
      return Object.assign({}, state, { cart: arr });
    }
    case DELETE_FROM_CART: {
      let arr = state.cart.slice();
      arr = arr.filter((item, idx) => !action.indexesArray.includes(`${idx}`));
      sessionStorage.setItem("cart", JSON.stringify(arr));
      return Object.assign({}, state, { cart: arr });
    }

    default:
      return state;
  }
}

export function reducerSortSection(state = initialState, action) {
  switch (action.type) {
    case HIGHLIGHT_ATTRIBUTE: {
      const key = Object.keys(action.attr)[0];
      if (
        state.attributesForSearch[key] &&
        !state.attributesForSearch[key].includes(action.attr[key])
      ) {
        const arr = state.attributesForSearch[key].slice();
        arr.push(action.attr[key][0]);
        return Object.assign({}, state, {
          attributesForSearch: {
            ...state.attributesForSearch,
            [key]: arr
          }
        });
      }
      return Object.assign({}, state, {
        attributesForSearch: { ...action.attr, ...state.attributesForSearch }
      });
    }
    case UNHIGHLIGHT_ATTRIBUTE: {
      const key = Object.keys(action.attr)[0];
      const arr = state.attributesForSearch[key].slice();
      arr.splice(
        state.attributesForSearch[key].indexOf(action.attr[key][0]),
        1
      );
      return Object.assign({}, state, {
        attributesForSearch: {
          ...state.attributesForSearch,
          [key]: arr
        }
      });
    }
    case DELETE_ONE_FIELD: {
      return Object.assign({}, state, {
        attributesForSearch: {
          ...state.attributesForSearch,
          [action.field]: []
        }
      });
    }
    case GET_ONLY_SELECTION_PRODUCTS: {
      return Object.assign({}, state, { selectedProducts: action.products });
    }
    default:
      return state;
  }
}
