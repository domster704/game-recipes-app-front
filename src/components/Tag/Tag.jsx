import React from'react';
import s from "./Tag.module.css";

export const Tag = ({children, inFilter}) => {
    return <p className={`${s.tag} ${inFilter && s.filterTag}`}>{children}</p>;
}