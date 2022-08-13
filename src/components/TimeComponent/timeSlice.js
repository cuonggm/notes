import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    timeRemain: -1,
    isRunning: false
};

const timeSlice = createSlice({
    name: "timeSlice",
    initialState,
    reducers: {
        setTimeRemain: (state, action) => {
            state.timeRemain = action.payload.timeRemain;
        },

        setRunning: (state, action) => {
            state.isRunning = action.payload.isRunning;
        },
        decreaseOne: (state) => {
            state.timeRemain -= 1;
        }
    },
});

// Exports
export const timeActions = timeSlice.actions;
export default timeSlice.reducer;
