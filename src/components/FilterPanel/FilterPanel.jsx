import React from 'react';
import s from './FilterPanel.module.css';
import {useDispatch} from "react-redux";
import {disableFilter} from "../../store/filterSlice";

export const FilterPanel = () => {
    const dispatch = useDispatch();

    return (
        <div className={s.filterView}>
            <div className={s.overlay} onClick={() => dispatch(disableFilter())}></div>
            <div className={s.filterPanel}>
                <h2>Фильтр</h2>
                <hr/>
                <div className={s.filterList}>
                    <p>Ингредиенты</p>
                </div>
            </div>
        </div>
    );
}