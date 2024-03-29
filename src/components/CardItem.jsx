import React from "react";

import "../App.css";
import EmptyValueInput from "./EmptyValueInput/EmptyValueInput";
import {useDispatch, useSelector} from "react-redux";
import {updateDescription, updateIngredients, updateTags} from "../store/recipeSlice";


export const CardItem = (props) => {
    const dispatch = useDispatch();
    const recipesStore = useSelector((state) => state.recipes);
    const {item, index, onDone} = props;

    return (
        <div className="task-item">
            <h3>{item.title}</h3>
            {
                item.description && <p>{item.description}</p> ||
                <EmptyValueInput placeholder="Описание" type="textarea" onClickSVG={(input) => {
                    dispatch(updateDescription({
                        id: item.id,
                        newDescription: input.current.value
                    }));
                    input.value = '';
                }}/>
            }
            <div className="data-container">
                <div className="data-list">
                    {
                        item.ingredients &&
                        <>
                            <span className="ingredients">Ингредиенты:</span>
                            {item.ingredients.map((ingredient, i) => {
                                return <p className="tag" key={i}>{ingredient}</p>;
                            })}
                        </>
                    }
                    <EmptyValueInput placeholder="Ингредиенты" type="input" onClickSVG={(input) => {
                        dispatch(updateIngredients({
                            id: item.id,
                            newIngredients: input.current.value
                        }));
                        input.value = '';
                    }}/>
                </div>
                <div className="data-list">
                    {
                        item.tags.length > 0 && item.tags.map((tag, i) => {
                            return <div className="tag" key={i}>{tag}</div>;
                        })
                    }
                    <EmptyValueInput placeholder="Теги" type="input" onClickSVG={(input) => {
                        dispatch(updateTags({
                            id: item.id,
                            newTag: input.current.value
                        }));
                    }}/>
                </div>
            </div>

        </div>
    )
}


