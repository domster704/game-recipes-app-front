import React from "react";

import {Recipe} from './Recipe/Recipe';
import s from './RecipeList.module.css';
import {FilterButton} from "./FilterButton/FilterButton";
import {useSelector} from "react-redux";

/**
 *
 * @param props {{items: Object, onDone: Function}}
 * @returns {Element}
 */
export const RecipeList = (props) => {
    const filterStore = useSelector(state => state.filter.filter);
    const {items, onDone} = props

    const doFilteringItems = () => {
        return items.filter(item => {
            return !(filterStore.category && !item.ingredients.includes(filterStore.category) ||
                filterStore.name && item.title && item.title.match(filterStore.name) === null);

        })
    }


    return (
        <div className={s.recipes_container}>
            <FilterButton/>
            <div className={s.recipe_list}>
                {doFilteringItems(items)?.map((item, index) => (
                    <Recipe
                        item={item}
                        key={index}
                        index={index}
                        onDone={() => onDone(item)}
                    />
                ))}
            </div>
        </div>
    )
}


