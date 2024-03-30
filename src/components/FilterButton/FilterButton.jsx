import React from 'react';
import s from './FilterButton.module.css';
import {useDispatch} from "react-redux";
import {showFilter} from "../../store/filterSlice";

export const FilterPanel = (props) => {
    const dispatch = useDispatch();

    return (
        <button className={s.filter} onClick={() => dispatch(showFilter())}>Фильтр</button>
    );
}