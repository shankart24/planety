import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    finalData: []
};

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addData: (state, { payload }) => {
            state.finalData = payload;
        }
    }
});

export const { addData } = dataSlice.actions;
export default dataSlice.reducer;
