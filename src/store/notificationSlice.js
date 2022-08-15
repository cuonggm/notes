import {createSlice} from "@reduxjs/toolkit";

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
        clear: (state) => {
            state.type = "";
            state.message = "";
            state.description = "";
        }
    },
});

export const notifyMessage = (message, description, type, dispatch) => {
    dispatch(notificationActions.pushNotification({
        type: type,
        message: message,
        description: description,
    }));

    // dispatch(notificationActions.clear());
}

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
