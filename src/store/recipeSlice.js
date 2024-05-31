import {createSlice} from '@reduxjs/toolkit';
import {addNewRecipe, getRecipes, updateRecipe} from "./recipeThunk";

let initialState = {
    isAddNewRecipeOn: true,
    editIdRecipe: "",
    recipes: {},
    /**
     * Функция для получения всех ингридиентов
     * @returns {Array<String>} - Список всех ингридиентов
     */
    getAllIngredients: () => {
        let allIngredients = [];
        for (let key in initialState.recipes) {
            allIngredients = allIngredients.concat(initialState.recipes[key].ingredients);
        }
        return allIngredients;
    },
    /**
     * Функция для получения всех тегов
     * @returns {Array<String>} - Список всех тегов
     */
    getAllTags: () => {
        let allTags = [];
        for (let key in initialState.recipes) {
            allTags = allTags.concat(initialState.recipes[key].tags);
        }
        return allTags;
    },
}

/**
 * Determine whether the given `input` is iterable.
 *
 * @returns {Boolean}
 */
function isIterable(object) {
    if (object === null || object === undefined) {
        return false
    }

    return typeof object[Symbol.iterator] === 'function'
}

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setAddNewRecipeOn: (state, action) => {
            state.isAddNewRecipeOn = action.payload;
        },
        /**
         * @param state
         * @param action {{payload: {id: String, newTag: String}}}
         */
        updateTags: (state, action) => {
            state.recipes[action.payload.id].tags.push(action.payload.newTag);
        },
        /**
         * @param state
         * @param action {{payload: {id: String, newIngredients: String}}}
         */
        updateIngredients: (state, action) => {
            state.recipes[action.payload.id].ingredients.push(action.payload.newIngredients);
        },
        /**
         * @param state
         * @param action {{payload: {id: String, newDescription: String}}}
         */
        updateDescription: (state, action) => {
            state.recipes[action.payload.id].description = action.payload.newDescription;
        },
        /**
         * @param state
         * @param action {{payload: {
         *      id: String,
         *      title: String,
         *      description: String,
         *      ingredients: Array<String>,
         *      tags: Array<String>,
         *      people: Number,
         *      time: Number,
         *      category: String
         * }}},
         */
        addRecipe: (state, action) => {
            state.recipes[action.payload.id] = action.payload;
        },
        /**
         * @param state
         * @param action {{payload: {id: String}}},
         */
        removeRecipe: (state, action) => {
            delete state.recipes[action.payload.id];
        },
        setEditIdRecipe: (state, action) => {
            state.editIdRecipe = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewRecipe.fulfilled, (state, action) => {
            })
            .addCase(updateRecipe.fulfilled, (state, action) => {
            })
            .addCase(getRecipes.fulfilled, (state, action) => {
                if (!isIterable(action.payload)) {
                    return;
                }
                for (let elem of action.payload) {
                    state.recipes[elem.id] = elem;
                }
            });
    }
});

export const {
    addRecipe,
    removeRecipe,
    updateDescription,
    updateIngredients,
    updateTags,
    setAddNewRecipeOn,
    setEditIdRecipe
} = recipeSlice.actions;
export default recipeSlice.reducer;