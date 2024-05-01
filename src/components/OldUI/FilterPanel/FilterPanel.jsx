import React from 'react';
import s from './FilterPanel.module.css';
import {useDispatch, useSelector} from "react-redux";
import {disableFilter} from "../../../store/filterSlice";
import {Tag} from "../Tag/Tag";

export const FilterPanel = () => {
    const {getAllIngredients, getAllTags} = useSelector(state => state.recipes);
    const dispatch = useDispatch();

    return (
        <div className={s.filterView}>
            <div className={s.overlay} onClick={() => dispatch(disableFilter())}></div>
            <div className={s.filterPanel}>
                <h2>Фильтр</h2>
                <hr/>
                <br/>
                <br/>

                <h3>Ингредиенты</h3>
                <hr/>
                <div className={s.filterList}>
                    {getAllIngredients().map((item, index) => {
                        return <Tag inFilter={true} key={index}>{item}</Tag>
                    })}
                </div>
                <br/>

                <h3>Теги</h3>
                <hr/>
                <div className={s.filterList}>
                    {getAllTags().map((item, index) => {
                        return <Tag inFilter={true} key={index}>{item}</Tag>
                    })}
                </div>
            </div>
        </div>
    );
}