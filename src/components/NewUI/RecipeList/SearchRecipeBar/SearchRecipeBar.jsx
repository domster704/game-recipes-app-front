import React from "react";
import s from "./SearchRecipeBar.module.css";
import {useDispatch} from "react-redux";
import {setNameFilter} from "../../../../store/filterSlice";
import {useSelector} from "react-redux";
import searchIcon from "./img/searchIcon.svg";

/**
 * Поисковой блок для поиска рецептов. Если рецепт не найден, то создается новый
 * @returns {Element}
 */
export const SearchRecipeBar = () => {
    const dispatch = useDispatch();
    let [recipeTitle, setRecipeTitle] = React.useState('');

    return (
        <form className={s.form_search_recipe} onSubmit={(event) => {
            event.preventDefault();
            dispatch(setNameFilter(recipeTitle));
        }}>
            <div className={s.search_bar}>
                <input
                    className={s.search_input}
                    type="text"
                    placeholder="Поиск..."
                    value={recipeTitle}
                    onChange={event => {
                        setRecipeTitle(event.target.value);
                    }}
                    autoFocus
                />
                <button>
                    <img src={searchIcon} alt=""/>
                </button>
            </div>

        </form>
    )
}

