import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    isFilterOn: false,
    filter: {}
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        showFilter: (state) => {
            state.isFilterOn = true;
        },
        disableFilter: (state) => {
            state.isFilterOn = false;
        },
        clearFilter: (state) => {
            state.isFilterOn = false;
            state.filter = {};
        }
    }
});

export const {showFilter, clearFilter, disableFilter} = filterSlice.actions;
export default filterSlice.reducer