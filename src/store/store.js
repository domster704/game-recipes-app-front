import {configureStore} from '@reduxjs/toolkit';
import recipeSlice from "./recipeSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
    reducer: {
        recipes: recipeSlice,
        filter: filterSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;