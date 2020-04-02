import {
  GET_CATEGORIES,
  SAVE_PRODUCT_CATEGORY_ID,
  GET_COUNT,
  GET_ONE_PRODUCT,
  GET_ATTRIBUTES,
  SAVE_PRODUCTS
} from "./../actions";
import { ADD_TO_CART, DELETE_FROM_CART } from "../actions/actionsCart";
import {
  HIGHLIGHT_ATTRIBUTE,
  UNHIGHLIGHT_ATTRIBUTE,
  DELETE_ONE_FIELD,
  CLICK_SHOW_SELECTION,
  SAVE_FOUND_PRODUCTS,
  DELETE_ALL_ATTRIBUTES,
  EXIST_SORT_ATTRIBUTES
} from "../actions/sortSectionAction";

const initialState = {
  cart: sessionStorage.getItem("cart")
    ? JSON.parse(sessionStorage.getItem("cart"))
    : [],
  attributesForSearch: {},
  selectedProducts: [],
  isClicked: false,
  arrayOfAllAtributes: [],
  isExistAttributes: false
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, {
        categories: action.items
      });
    case SAVE_PRODUCT_CATEGORY_ID:
      return Object.assign({}, state, {
        category_id: action.category_id,
        page: action.page
      });
    case GET_COUNT:
      return Object.assign({}, state, { count: action.item });
    case GET_ONE_PRODUCT:
      return Object.assign({}, state, {
        id: action.id
      });
    case GET_ATTRIBUTES:
      return Object.assign({}, state, { attributes: action.attr });
    case SAVE_PRODUCTS:
      return Object.assign({}, state, { products: action.products });
    default:
      return state;
  }
}

export function reducerCart(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      let arr = state.cart.slice();
      if (!arr.includes(action.item)) {
        arr.push(action.item);
      }
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
    case SAVE_FOUND_PRODUCTS: {
      return Object.assign({}, state, {
        countProducts: action.num
      });
    }
    case HIGHLIGHT_ATTRIBUTE: {
      const key = Object.keys(action.attr)[0];
      const arrayOfAllAtributes = state.arrayOfAllAtributes.slice();
      arrayOfAllAtributes.push(action.attr[key][0]);
      if (
        state.attributesForSearch[key] &&
        !state.attributesForSearch[key].includes(action.attr[key])
      ) {
        const arr = state.attributesForSearch[key].slice();
        arr.push(action.attr[key][0]);
        return Object.assign({}, state, {
          arrayOfAllAtributes: arrayOfAllAtributes,
          attributesForSearch: {
            ...state.attributesForSearch,
            [key]: arr
          }
        });
      }
      return Object.assign({}, state, {
        attributesForSearch: { ...action.attr, ...state.attributesForSearch },
        arrayOfAllAtributes: arrayOfAllAtributes
      });
    }
    case UNHIGHLIGHT_ATTRIBUTE: {
      const key = Object.keys(action.attr)[0];
      const arr = state.attributesForSearch[key].slice();
      const arrayOfAllAtributes = state.arrayOfAllAtributes.slice();
      arr.splice(
        state.attributesForSearch[key].indexOf(action.attr[key][0]),
        1
      );
      arrayOfAllAtributes.splice(
        state.arrayOfAllAtributes.indexOf(action.attr[key][0]),
        1
      );
      return Object.assign({}, state, {
        attributesForSearch: {
          ...state.attributesForSearch,
          [key]: arr
        },
        arrayOfAllAtributes: arrayOfAllAtributes
      });
    }
    case DELETE_ONE_FIELD: {
      const arrayOfAllAtributes = state.arrayOfAllAtributes
        .slice()
        .filter(
          item => !state.attributesForSearch[action.field].includes(item)
        );
      return Object.assign({}, state, {
        attributesForSearch: {
          ...state.attributesForSearch,
          [action.field]: []
        },
        arrayOfAllAtributes: arrayOfAllAtributes
      });
    }
    case CLICK_SHOW_SELECTION: {
      return Object.assign({}, state, { isClicked: action.bool });
    }
    case DELETE_ALL_ATTRIBUTES: {
      return Object.assign({}, state, {
        attributesForSearch: {},
        arrayOfAllAtributes: []
      });
    }
    case EXIST_SORT_ATTRIBUTES: {
      return Object.assign({}, state, {
        isExistAttributes: action.isExist
      });
    }
    default:
      return state;
  }
}
