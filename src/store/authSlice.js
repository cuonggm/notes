import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const loginThunk = (username, password) => {
  return async (dispatch) => {
    // define nested logic function
    const logic = async () => {
      // logic comes here
      console.log("Running logic function");
      console.log("password=" + password);
      if (password === username) {
        return true;
      }
      return false;
    };
    // run  this function. use await to get result directly.
    const result = await logic();
    console.log(result);
    // then dispatch action
    if (result === true) {
      dispatch(authActions.login());
    } else {
      dispatch(authActions.logout());
    }
  };
};

export const authActions = authSlice.actions;
export default authSlice.reducer;
