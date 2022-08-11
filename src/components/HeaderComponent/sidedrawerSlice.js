import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidedrawerShow: false,
};

const sidedrawerSlice = createSlice({
  name: "sidedrawer",
  initialState: initialState,
  reducers: {
    show: (state) => {
      state.isSidedrawerShow = true;
    },
    hide: (state) => {
      state.isSidedrawerShow = false;
    },
  },
});

// Thunks
export const showThunk = () => {
  return async (dispatch) => {
    dispatch(sidedrawerActions.show());
  };
};

export const hideThunk = () => {
  return async (dispatch) => {
    dispatch(sidedrawerActions.hide());
  };
};

export const sidedrawerActions = sidedrawerSlice.actions;
export default sidedrawerSlice.reducer;
