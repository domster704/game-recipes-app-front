import React from "react";

import {CardItem} from './CardItem';
import "../App.css";


export const CardItemList = (props) => {
    const {items, onDone} = props

    return (
        <div  className="notes">
            {
                items?.map((item, index) => (
                    <CardItem
                        item={item}
                        key={index}
                        index={index}
                        onDone={() => onDone(item)}
                    />
                ))
            }
        </div>
        // <ul className="notes">
        //
        // </ul>
    )
}


