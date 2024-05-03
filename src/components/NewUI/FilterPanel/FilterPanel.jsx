import React from'react';
import s from './FilterPanel.module.css';
import {useSelector} from "react-redux";

const FilterPanel = () => {
    const recipesCategories = useSelector(state => state.recipes.getAllCategories());

    return (
        <div className={s.panel}>
            <h2>Все</h2>
            <div className={s.sub_categories}>
                {
                    recipesCategories.map((category, index) => {
                        return <p key={index}>{category}</p>
                    })
                }
            </div>
        </div>
    );
};

export default FilterPanel;