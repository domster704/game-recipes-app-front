import React from "react";
import s from "./SearchRecipeBar.module.css";

/**
 * Поисковой блок для поиска рецептов. Если рецепт не найден, то создается новый
 * @param props {{onAdd: Function}}
 * @returns {Element}
 */
export const SearchRecipeBar = (props) => {
    let [recipeTitle, setRecipeTitle] = React.useState('');

    const {onAdd} = props;

    return (
        <form className={s.form_search_recipe} onSubmit={(event) => {
            event.preventDefault();
            onAdd(recipeTitle);
            setRecipeTitle('');
        }}>
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
            <p>Веб-приложение с использованием <b>sber assistant</b> с возможностью поиска и добавления рецептов из
                различных игр и произведений.</p>
        </form>
    )
}

