import {createAsyncThunk} from '@reduxjs/toolkit'
import {apiUrl} from "../constants";

export const addNewRecipe = createAsyncThunk(
    'recipe/addNewRecipe',
    async ({recipe}, thunkAPI) => {
        let response = await fetch(`${apiUrl}/add_new_recipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe),
        });
        return response.json();
    }
);

export const updateRecipe = createAsyncThunk(
    'recipe/updateRecipe',
    async ({recipe}, thunkAPI) => {
        let response = await fetch(`${apiUrl}/update_recipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe),
        });
        return response.json();
    }
);

export const getRecipes = createAsyncThunk(
    'recipe/getRecipes',
    async (_, thunkAPI) => {
        let response = await fetch(`${apiUrl}/get_all_recipes`);
        return response.json();
    }
)