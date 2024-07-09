import React from 'react'
import s from './AddingRecipePanel.module.css'
import {useDispatch} from "react-redux";
import {setAddNewRecipeOn, setEditIdRecipe} from "../../store/recipeSlice";
import {addNewRecipe, getRecipes, updateRecipe} from "../../store/recipeThunk";

function autoSize(elem) {
    elem.style.height = 'auto';
    elem.style.height = `${elem.scrollHeight}px`;
}

const AddingRecipePanel = ({recipe}) => {
    const titleInputRef = React.useRef(null);
    const instructionTextareaRef = React.useRef(null);

    const dispatch = useDispatch();
    const [ingredients, setIngredients] = React.useState(['']);

    React.useEffect(() => {
        if (recipe?.ingredients?.length !== 0) {
            setIngredients(recipe?.ingredients || ['']);
        } else {
            setIngredients([''])
        }
    }, [recipe?.id]);

    React.useEffect(() => {
        /**
         * Нужно для выполнения метода onFocus у textarea для вызова функции {@link autoSize}
         */
        instructionTextareaRef.current?.focus();
        instructionTextareaRef.current?.blur();
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

        if (recipe?.category) {
            await dispatch(updateRecipe({
                recipe: newRecipe
            }));
        } else {
            await dispatch(addNewRecipe({
                recipe: newRecipe
            }));
        }

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
                     autoFocus={true}
                     tabIndex={0}
                     contentEditable={true}
                     suppressContentEditableWarning={true}
                     data-placeholder="Название"
                     onBlur={e => {
                         titleInputRef.current.innerHTML = e.target.textContent;
                     }}
                     defaultValue={recipe?.title || ''}>{recipe?.title || ''}</div>
            </div>
            <div className={`${s.inputBlock}`}>
                <p>Категория</p>
                <input placeholder="Категория"
                       autoFocus={true}
                       name="category"
                       required={true}
                       defaultValue={recipe?.category || ''}/>
            </div>
            <div className={`${s.inputBlock}`}>
                <p>Количество порций</p>
                <input placeholder="Количество порций"
                       autoFocus={true}
                       name="people"
                       required={true}
                       defaultValue={recipe?.people || ''}
                       onChange={inputChangeNumber}/>
            </div>
            <div className={`${s.inputBlock}`}>
                <p>Время</p>
                <input placeholder="Время в минутах"
                       autoFocus={true}
                       name="time"
                       required={true}
                       defaultValue={recipe?.time || ''}
                       onChange={inputChangeNumber}/>
            </div>
            <div className={`${s.inputBlock}`}>
                <p>Описание</p>
                <textarea placeholder="Описание"
                          autoFocus={true}
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

                                    <div contentEditable={true}
                                         suppressContentEditableWarning={true}
                                         data-placeholder="Ингредиент"
                                         key={index}
                                         autoFocus={true}
                                         tabIndex={0}
                                         onBlur={e => {
                                             const value = e.target.textContent

                                             setIngredients(ingredients.map((ingredient, i) => i === index ? value : ingredient));
                                         }}>{ingredient || ""}</div>

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
                <textarea ref={instructionTextareaRef}
                          placeholder="Инструкция"
                          name="instructions"
                          autoFocus={true}
                          defaultValue={recipe?.instructions || ''}
                          onInput={e => {
                              autoSize(e.target);
                          }}
                          onFocus={e => {
                              autoSize(e.target);
                          }}/>
            </div>
        </form>
    );
};
export default AddingRecipePanel;