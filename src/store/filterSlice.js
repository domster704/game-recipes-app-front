import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    isFilterOn: false,
    filter: {
        name: "",
        category: "",
    }
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
        },
        setNameFilter: (state, action) => {
            state.filter.name = action.payload;
        },
        setCategoryFilter: (state, action) => {
            state.filter.category = action.payload;
        }
    }
});

export const {
    showFilter,
    clearFilter,
    disableFilter,
    setNameFilter,
    setCategoryFilter
} = filterSlice.actions;
export default filterSlice.reducer