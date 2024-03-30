import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    recipes: {
        'xz3e7b': {
            id: 'xz3e7b',
            title: 'Ароматное пюре',
            description: 'Картофельное пюре с приправами. Картофель раздавлен в пюре с нежной текстурой и полит соусом. Вкус мягкий и богатый. Такое пюре удовлетворит любой голодный желудок, и не важно, гарнир это или основное блюдо.',
            ingredients: ['Картофель 6шт', 'Сметана 3шт', 'Перец 4шт'],
            tags: ["Genshin Impact", "Мондштадт", "3*"]
        },
        // 'i9rsph': {
        //     id: 'i9rsph',
        //     title: 'Рецепт 2',
        //     description: '',
        //     ingredients: [],
        //     tags: []
        // },
    },
    filters: {}
}

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        updateTags: (state, action) => {
            state.recipes[action.payload.id].tags.push(action.payload.newTag);
        },
        updateIngredients: (state, action) => {
            state.recipes[action.payload.id].ingredients.push(action.payload.newIngredients);
        },
        updateDescription: (state, action) => {
            state.recipes[action.payload.id].description = action.payload.newDescription;
        },
        addRecipe: (state, action) => {
            state.recipes[action.payload.id] = action.payload;
        },
        removeRecipe: (state, action) => {
            delete state.recipes[action.payload.id];
        }
    }
});

export const {
    addRecipe,
    removeRecipe,
    updateDescription,
    updateIngredients,
    updateTags
} = recipeSlice.actions;
export default recipeSlice.reducer;