import {configureStore} from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import sidedrawerReducer from "../components/HeaderComponent/sidedrawerSlice";
import notificationReducer from "./notificationSlice";
import loadingSlice from "./loadingSlice";
import timeReducer from "../components/TimeComponent/timeSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sidedrawer: sidedrawerReducer,
        notification: notificationReducer,
        loadingSlice: loadingSlice,
        timeSlice: timeReducer
    },
});
