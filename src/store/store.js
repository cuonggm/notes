import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import sidedrawerReducer from "../pages/AppHeader/sidedrawerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidedrawer: sidedrawerReducer,
  },
});
