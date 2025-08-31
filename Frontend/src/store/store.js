import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import turfSlotSlice from './turfSlotSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        turf: turfSlotSlice
    },
});

export default store;
