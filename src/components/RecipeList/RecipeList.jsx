import React from "react";

import {Recipe} from '../Recipe/Recipe';
import s from './RecipeList.module.css';
import {FilterButton} from "../FilterButton/FilterButton";

/**
 *
 * @param props {{items: Object, onDone: Function}}
 * @returns {Element}
 */
export const RecipeList = (props) => {
    const {items, onDone} = props

    return (
        <div className={s.recipes_container}>
            <FilterButton/>
            <div className={s.recipe_list}>
                {items?.map((item, index) => (
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


