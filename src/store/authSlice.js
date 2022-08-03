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

      state.displayName = data.displayName;
      state.email = data.email;
      state.expiresIn = data.expiresIn;
      state.idToken = data.idToken;
      state.kind = data.kind;
      state.localId = data.localId;
      state.refreshToken = data.refreshToken;
      state.registered = data.registered;

      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.isLoggedIn = false;
    },

    updateUserInfoStatus: (state, action) => {
      const data = action.payload;

      state.displayName = data.displayName;
      state.email = data.email;
      state.expiresIn = data.expiresIn;
      state.idToken = data.idToken;
      state.kind = data.kind;
      state.localId = data.localId;
      state.refreshToken = data.refreshToken;
      state.registered = data.registered;

      state.isLoggedIn = true;
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
        } else {
          rememberUserInfoToLocalStorage(data);
          dispatch(authActions.login(data));
        }
      })
      .catch((error) => {
        console.log("Print Login Error:");
        console.log(error);
      });
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
