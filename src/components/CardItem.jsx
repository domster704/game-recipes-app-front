import React from "react";

import "../App.css";


export const CardItem = (props) => {
    const {item, index, onDone} = props;
    return (
        <li className="task-item">
            <span>
              <span
                  style={{fontWeight: "bold"}}>{index + 1}. </span>
              <span style={{textDecorationLine: item.completed ? "line-through" : "none",}}>
                {item.title}
              </span>
            </span>
            <input
                className="done-item"
                type="checkbox"
                checked={item.completed}
                onChange={(event) => onDone(item)}
            />
        </li>
    )
}


