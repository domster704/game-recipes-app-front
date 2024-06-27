import React from 'react'
import s from './AddingRecipePanel.module.css'
import {useDispatch} from "react-redux";
import {setAddNewRecipeOn, setEditIdRecipe} from "../../store/recipeSlice";
import {addNewRecipe, getRecipes, updateRecipe} from "../../store/recipeThunk";

const AddingRecipePanel = ({recipe}) => {
    const titleInputRef = React.useRef(null);

    const dispatch = useDispatch();
    const [ingredients, setIngredients] = React.useState(['']);

    React.useEffect(() => {
        setIngredients(recipe?.ingredients || ['']);
    }, [recipe?.id]);
    const addCategory = () => {
        setIngredients([...ingredients, ''])
    };

    const removeCategory = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const addRecipeSubmit = async (e) => {
        e.preventDefault();
        const formElements = e.target.elements;

        const newRecipe = {
            id: recipe?.id || null,
            title: titleInputRef.current?.innerHTML || null,
            category: formElements.category.value || null,
            people: parseInt(formElements.people?.value) || null,
            time: parseInt(formElements.time?.value) || null,
            description: formElements.description.value || null,
            ingredients: ingredients || [],
            instructions: formElements.instructions.value || null
        };
        if (!newRecipe.title ||
            !newRecipe.category ||
            !newRecipe.people ||
            !newRecipe.time) {
            alert('Заполните все поля!')
            return;
        }

        const apiFunction = recipe?.category ? updateRecipe : addNewRecipe;
        console.log(recipe)
        await dispatch(apiFunction({
            recipe: newRecipe
        }));
        dispatch(setEditIdRecipe(null));
        dispatch(setAddNewRecipeOn(false));
        dispatch(getRecipes());
    }

    const cancelClick = () => {
        dispatch(setAddNewRecipeOn(false));
        dispatch(setEditIdRecipe(null));
    }

    const inputChangeNumber = (e) => {
        e.target.value = e.target.value.replace(/\D/g, '')
    }

    return (
        <form className={s.container} onSubmit={addRecipeSubmit}>
            <div className={s.top_buttons}>
                <button className={s.cancelButton} onClick={cancelClick} type="button">Отмена</button>
                <button className={s.saveButton} type="submit">Сохранить</button>
            </div>
            <hr/>

            <div className={`${s.inputBlock} ${s.inputBlock_title}`}>
                <p>Название</p>
                <div ref={titleInputRef}
                     contentEditable={true}
                    // placeholder="Название"
                    //  name="title"
                    //  required={true}
                    //  contentEditable={"true"}
                    // type="text"
                     defaultValue={recipe?.title || ''}>{recipe?.title || 'Название'}</div>
            </div>
            <div className={`${s.inputBlock}`}>
                <p>Категория</p>
                <input placeholder="Категория"
                       name="category"
                       required={true}
                       type="text"
                       defaultValue={recipe?.category || ''}/>
            </div>
            <div className={`${s.inputBlock}`}>
                <p>Количество порций</p>
                <input placeholder="Количество порций"
                       name="people"
                       required={true}
                       defaultValue={recipe?.people || ''}
                       onChange={inputChangeNumber}/>
            </div>
            <div className={`${s.inputBlock}`}>
                <p>Время</p>
                <input placeholder="Время в минутах"
                       name="time"
                       required={true}
                       defaultValue={recipe?.time || ''}
                       onChange={inputChangeNumber}/>
            </div>
            <div className={`${s.inputBlock}`}>
                <p>Описание</p>
                <textarea placeholder="Описание"
                          name="description"
                          defaultValue={recipe?.description || ''}/>
            </div>

            <span className={s.separator}></span>

            <div className={`${s.inputBlock} ${s.categoriesBlock}`}>
                <p>Ингредиенты</p>
                <div className={s.ingredientsList}>
                    {
                        ingredients.map((ingredient, index) => {
                            return (
                                <div className={s.ingredientElement}
                                     key={index}>
                                    <b>{index + 1}</b>
                                    {/*<textarea name={"ingredients" + index}*/}
                                    {/*          placeholder="Ингредиент"*/}
                                    {/*          key={index}*/}
                                    {/*          value={ingredient || ''}*/}
                                    {/*          onChange={e => {*/}
                                    {/*              const value = e.target.value;*/}

                                    {/*              setIngredients(ingredients.map((ingredient, i) => i === index ? value : ingredient));*/}
                                    {/*          }}/>*/}
                                    <div contentEditable={true}
                                         name={"ingredients" + index}
                                         placeholder="Ингредиент"
                                         key={index}
                                        // value={ingredient || ''}
                                         onChange={e => {
                                             const value = e.target.value;

                                             setIngredients(ingredients.map((ingredient, i) => i === index ? value : ingredient));
                                         }}>{ingredient || "Ингредиент"}</div>
                                    <button className={s.removeCategoryButton}
                                            onClick={() => removeCategory(index)}
                                            type="button">✖
                                    </button>
                                </div>
                            );
                        })
                    }
                </div>
                <button className={s.addCategoryButton}
                        onClick={addCategory}
                        type="button">+
                </button>
            </div>

            <span className={s.separator}></span>

            <div className={`${s.inputBlock} ${s.stepsBlock}`}>
                <p>Инструкция</p>
                <textarea placeholder="Инструкция"
                          name="instructions"
                          defaultValue={recipe?.instructions || ''}/>
            </div>
        </form>
    );
};
export default AddingRecipePanel;