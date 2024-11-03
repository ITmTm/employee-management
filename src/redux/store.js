import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from './employeeSlice.js';

const store = configureStore({
    reducer: {
        employees: employeeReducer,
    },
});

export default store;