import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  // data get from firebase after login
  displayName: "",
  email: "",
  expiresIn: "",
  idToken: "",
  kind: "",
  localId: "",
  refreshToken: "",
  registered: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const data = action.payload;
      state.isLoggedIn = true;

      state.displayName = data.displayName;
      state.email = data.email;
      state.expiresIn = data.expiresIn;
      state.idToken = data.idToken;
      state.kind = data.kind;
      state.localId = data.localId;
      state.refreshToken = data.refreshToken;
      state.registered = data.registered;
    },

    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const loginThunk = (username, password) => {
  return async (dispatch) => {
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0MMvo910ctKue-U3w9VIKCiOGCOdxb-g",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error !== undefined) {
          console.log("Loggin failed.");
        } else {
          rememberUserInfoToLocalStorage(data);
          dispatch(authActions.login(data));
        }
      })
      .catch((error) => {
        console.log("Print error");
        console.log(error);
      });

    // // define nested logic function
    // const logic = async () => {
    //   // logic comes here
    //   console.log("Running logic function");
    //   console.log("password=" + password);
    //   if (password === username) {
    //     return true;
    //   }
    //   return false;
    // };
    // // run  this function. use await to get result directly.
    // const result = await logic();
    // console.log(result);
    // // then dispatch action
    // if (result === true) {
    //   dispatch(authActions.login());
    // } else {
    //   dispatch(authActions.logout());
    // }
  };
};

export const logoutThunk = () => {
  return async (dispatch) => {
    clearUserInfoFromLocalStorage();
    dispatch(authActions.logout());
  };
};

// Private Util Functions
const rememberUserInfoToLocalStorage = (userInfo) => {
  localStorage.setItem("displayName", userInfo.displayName);
  localStorage.setItem("email", userInfo.email);
  localStorage.setItem("expiresIn", userInfo.expiresIn);
  localStorage.setItem("idToken", userInfo.idToken);
  localStorage.setItem("kind", userInfo.kind);
  localStorage.setItem("localId", userInfo.localId);
  localStorage.setItem("refreshToken", userInfo.refreshToken);
  localStorage.setItem("registered", userInfo.registered);
};

const clearUserInfoFromLocalStorage = () => {
  localStorage.removeItem("displayName");
  localStorage.removeItem("email");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("idToken");
  localStorage.removeItem("kind");
  localStorage.removeItem("localId");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("registered");
};

// Exports
export const authActions = authSlice.actions;
export default authSlice.reducer;
