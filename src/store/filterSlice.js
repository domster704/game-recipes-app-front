import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    isFilterOn: false,
    filter: {}
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        showFilter: (state, action) => {
            state.isFilterOn = true;
        },
        disableFilter: (state, action) => {
            state.isFilterOn = false;
        },
        clearFilter: (state, action) => {
            state.isFilterOn = false;
            state.filter = {};
        }
    }
});

export const {showFilter, clearFilter, disableFilter} = filterSlice.actions;
export default filterSlice.reducer