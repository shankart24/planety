import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./features/dataSlice";
import filterSlice from "./features/filterSlice";

export const myStore = configureStore({
    reducer: { filters: filterSlice, data: dataSlice }
});
