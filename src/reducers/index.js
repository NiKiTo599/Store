import {GET_CATEGORIES} from './../actions';

const initialState = {};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.items;
    default:
      return state;
  }
}
