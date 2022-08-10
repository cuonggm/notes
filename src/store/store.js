import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import sidedrawerReducer from "../pages/AppHeader/sidedrawerSlice";
import notificationReducer from "./notificationSlice";
import loadingSlice from "./loadingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidedrawer: sidedrawerReducer,
    notification: notificationReducer,
    loadingSlice: loadingSlice,
  },
});
