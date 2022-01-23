import React, { useReducer } from "react";
import {
  ADD_ITEM_TO_KART,
  REMOVE_ITEM_FROM_KART,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  SET_LOADING,
} from "action.type";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_KART:
      return [...state, action.payload];
    case REMOVE_ITEM_FROM_KART:
      return state.filter((item) => {
        item.id === action.payload;
      });

    default:
      break;
  }
};

export default reducer;
