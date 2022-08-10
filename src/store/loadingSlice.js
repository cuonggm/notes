import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    setLoad: (state, action) => {
      const data = action.payload;

      state.isLoading = data.isLoading;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
