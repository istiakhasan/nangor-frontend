import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import menuSlice from "./feature/menuSlice";
import cartSlice from "./feature/cartSlice";

export const reducer = combineReducers({
  menu: menuSlice,
  cart: cartSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});
