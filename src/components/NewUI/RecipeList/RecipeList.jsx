import React from "react";
import s from "./RecipeList.module.css";
import {SearchRecipeBar} from "./SearchRecipeBar/SearchRecipeBar";
import {useDispatch, useSelector} from "react-redux";
import Recipe from "./Recipe/Recipe";
import {setAddNewRecipeOn} from "../../../store/recipeSlice";
import {getRecipes} from "../../../store/recipeThunk";

const RecipeList = () => {
    const dispatch = useDispatch();
    const recipeStore = useSelector((state) => state.recipes);
    const items = Object.keys(recipeStore.recipes).map(key => recipeStore.recipes[key]);

    const setAddNewRecipe = () => {
        dispatch(setAddNewRecipeOn(!recipeStore.isAddNewRecipeOn));
    }

    React.useEffect(() => {
        dispatch(getRecipes());
    }, []);

    return (
        <div className={s.recipeListBlock}>
            <header>
                <h1>Все рецепты</h1>
                <div className={s.header_right}>
                    <SearchRecipeBar/>
                    <button onClick={setAddNewRecipe}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.26562 17.3381V0.0539763H10.7045V17.3381H7.26562ZM0.349432 10.4091V6.97017H17.6335V10.4091H0.349432Z"
                                fill="black"/>
                        </svg>
                    </button>
                </div>
            </header>
            <div className={s.recipeList}>
                {
                    items.map((item, index) => (
                        <Recipe recipe={item} key={index}/>
                    ))
                }
            </div>
        </div>
    )
};

export default RecipeList;
