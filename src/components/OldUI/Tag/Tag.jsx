import React from'react';
import s from "./Tag.module.css";

export const Tag = ({children, inFilter, isChosen}) => {
    return <p className={`${s.tag} ${inFilter && s.filterTag} ${isChosen && s.chosenTag}`}>{children}</p>;
}