import React from "react";

import s from "./Recipe.module.css";
import EmptyValueInput from "../EmptyValueInput/EmptyValueInput";
import {useDispatch} from "react-redux";
import {updateDescription, updateIngredients, updateTags} from "../../store/recipeSlice";


/**
 * Компонент рецепта
 * @param props {{item: Object}}
 * @returns {Element}
 */
export const Recipe = (props) => {
    const dispatch = useDispatch();
    const {item} = props;

    return (
        <div className={s.task_item}>
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
            <div className={s.data_container}>
                <div className={s.data_list}>
                    {
                        item.ingredients &&
                        <>
                            <span className={s.ingredients}>Ингредиенты:</span>
                            {item.ingredients.map((ingredient, i) => {
                                return <p className={s.tag} key={i}>{ingredient}</p>;
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
                <div className={s.data_list}>
                    {
                        item.tags.length > 0 && item.tags.map((tag, i) => {
                            return <div className={s.tag} key={i}>{tag}</div>;
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


