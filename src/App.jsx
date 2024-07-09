import React from "react";
import "./voiceSberNewUI.css";
import {useSelector} from "react-redux";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import RecipeList from "./components/RecipeList/RecipeList";
import s from "./App.module.css";
import AddingRecipePanel from "./components/AddingRecipePanel/AddingRecipePanel";


const App = () => {
    const recipesStore = useSelector(state => state.recipes);

    // React.useLayoutEffect(() => {
    //     const textarea = document.querySelectorAll('textarea');
    //
    //     textarea.forEach((el) => {
    //         el.addEventListener('input', (e) => {
    //             el.style.height = `${el.scrollHeight}px`;
    //         });
    //     })
    // }, []);

    return (
        <div className={`${s.app} ${recipesStore.isAddNewRecipeOn && s.three_column}`}>
            <FilterPanel/>
            <RecipeList/>
            {
                recipesStore.isAddNewRecipeOn && <AddingRecipePanel
                    recipe={recipesStore.recipes[recipesStore.editIdRecipe]}/>
            }
        </div>
    )
}

export default App;