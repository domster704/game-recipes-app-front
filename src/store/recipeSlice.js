import {createSlice} from '@reduxjs/toolkit';
import {addNewRecipe, getRecipes} from "./recipeThunk";

let initialState = {
    isAddNewRecipeOn: true,
    recipes: {
        'xz3e7b': {
            id: 'xz3e7b',
            title: 'Ароматное пюре',
            people: 1,
            time: 25,
            description: 'Картофельное пюре с приправами. Картофель раздавлен в пюре с нежной текстурой и полит соусом. Вкус мягкий и богатый. Такое пюре удовлетворит любой голодный желудок, и не важно, гарнир это или основное блюдо.',
            ingredients: ['Картофель', 'Сметана', 'Перец'],
            tags: ["Genshin Impact", "Мондштадт", "3*"],
            category: "Genshin Impact"
        },
        'test': {
            id: 'test',
            title: 'Котлетка',
            people: 2,
            time: 105,
            description: 'Картофельное пюре с приправами. Картофель раздавлен в пюре с нежной текстурой и полит соусом. Вкус мягкий и богатый. Такое пюре удовлетворит любой голодный желудок, и не важно, гарнир это или основное блюдо.',
            ingredients: ['Мясо', 'Лук'],
            tags: [],
            category: "Life"
        }
    },
    getAllCategories: () => {
        let allCategories = [];
        for (let key in initialState.recipes) {
            allCategories = allCategories.concat(initialState.recipes[key].category);
        }
        return allCategories;
    },
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewRecipe.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(getRecipes.fulfilled, (state, action) => {
                state.recipes = action.payload;
                // console.log(action.payload);
            });
    }
});

export const {
    addRecipe,
    removeRecipe,
    updateDescription,
    updateIngredients,
    updateTags,
    setAddNewRecipeOn
} = recipeSlice.actions;
export default recipeSlice.reducer;