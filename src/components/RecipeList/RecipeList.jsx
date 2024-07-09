import React from "react";
import s from "./RecipeList.module.css";
import {SearchRecipeBar} from "./SearchRecipeBar/SearchRecipeBar";
import {useDispatch, useSelector} from "react-redux";
import Recipe from "./Recipe/Recipe";
import {setAddNewRecipeOn, setEditIdRecipe} from "../../store/recipeSlice";
import {getRecipes} from "../../store/recipeThunk";

const RecipeList = () => {
    const dispatch = useDispatch();
    const recipeStore = useSelector((state) => state.recipes);
    const filterStore = useSelector((state) => state.filter);
    const [items, setItems] = React.useState([]);

    const doFilteringItems = (items) => {
        return items.filter(item => {
            const filter = filterStore.filter;

            if (filter.category && item.category !== filter.category) {
                return false;
            }
            if (filter.name && item.title && item.title.match(filter.name) === null) {
                return false;
            }
            return true;
        })
    }

    React.useEffect(() => {
        setItems(doFilteringItems(Object.keys(recipeStore.recipes).map(key => recipeStore.recipes[key])).reverse());
    }, [recipeStore.recipes, filterStore.filter.category, filterStore.filter.name]);

    const setAddNewRecipe = () => {
        dispatch(setEditIdRecipe(null));
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
                        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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
