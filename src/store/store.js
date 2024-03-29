import {configureStore} from '@reduxjs/toolkit';
import recipeSlice, {addRecipe, removeRecipe} from "./recipeSlice";

const store = configureStore({
    reducer: {
        recipes: recipeSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;