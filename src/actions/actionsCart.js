export const ADD_TO_CART = "ADD_TO_CART",
  DELETE_FROM_CART = "DELETE_FROM_CART";

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    item
  };
}

export function deleteFromCart(indexesArray) {
  return {
    type: DELETE_FROM_CART,
    indexesArray
  };
}
