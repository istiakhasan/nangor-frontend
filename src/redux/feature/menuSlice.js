import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
 toggle:false
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleSidebar: (state,{payload}) => {
      state.toggle= payload?.show
    },
  },
});

export const {
  toggleSidebar
} = menuSlice.actions;

export default menuSlice.reducer;