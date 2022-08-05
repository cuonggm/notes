import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  message: "",
  description: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    pushNotification: (state, action) => {
      const data = action.payload;

      state.type = data.type;
      state.message = data.message;
      state.description = data.description;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
