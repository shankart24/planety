import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shapeOptions: [],
    colorOptions: [],
    sizeOptions: [],
    searchText: "",
    selectedColors: [],
    selectedShapes: [],
    selectedSizes: []
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        generateOptions: (state, { payload }) => {
            payload.forEach(item => {
                state[`${item.name}Options`] = item.data;
            });
        },
        handleOptionsOnMount: (state, { payload }) => {
            payload.forEach(item => {
                const { name, data } = item;
                switch (name) {
                    case "q":
                        state.searchText = data;
                        break;
                    case "shape":
                        state.selectedShapes = data;
                        break;
                    case "color":
                        state.selectedColors = data;
                        break;
                    case "size":
                        state.selectedSizes = data;
                        break;
                }
            });
        },
        handleOptions: (state, { payload }) => {
            const val = payload.data;
            state[payload.name] = !state[payload.name]?.includes(val)
                ? [...state[payload.name], val]
                : state[payload.name]?.filter(item => item !== val);
        },
        handleSearch: (state, { payload }) => {
            state.searchText = payload;
        }
    }
});

export const {
    generateOptions,
    handleOptions,
    handleOptionsOnMount,
    handleSearch
} = filterSlice.actions;
export default filterSlice.reducer;
