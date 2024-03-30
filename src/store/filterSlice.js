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
        clearFilter: (state, action) => {
            state.isFilterOn = false;
            state.filter = {};
        }
    }
});

export const {showFilter, clearFilter} = filterSlice.actions;
export default filterSlice.reducer