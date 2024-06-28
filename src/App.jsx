import React from "react";
import {createAssistant, createSmartappDebugger,} from "@salutejs/client";
import "./voiceSberNewUI.css";
import {addRecipe, removeRecipe} from "./store/recipeSlice";
import {useDispatch, useSelector} from "react-redux";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import RecipeList from "./components/RecipeList/RecipeList";
import s from "./App.module.css";
import AddingRecipePanel from "./components/AddingRecipePanel/AddingRecipePanel";

const initializeAssistant = (getState) => {
    if (process.env.NODE_ENV === 'development') {
        return createSmartappDebugger({
            token: process.env.REACT_APP_TOKEN ?? '',
            initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
            nativePanel: {
                defaultText: '',
                // screenshotMode: false,
                // tabIndex: -1,
            },
            getState,
        });
    }

    return createAssistant({getState});
};


const App = () => {
    const recipesStore = useSelector(state => state.recipes);
    const dispatch = useDispatch();

    const dispatchAssistantAction = (action) => {
        console.log(action)
        if (!action) {
            return
        }

        switch (action.type) {
            case 'add_recipe':
                return new_recipe(action);
            case 'done_note':
                return done_note(action);
            default:
                return;
        }
    }

    const getStateForAssistant = () => {
        return {
            // item_selector: {
            //     items: Object.keys(recipesStore.recipes).map((key) => {
            //         return recipesStore.recipes[key]
            //     })
            // },
        };
    }

    React.useEffect(() => {
        const assistant = initializeAssistant(() => getStateForAssistant());

        assistant.on("data", (event) => {
            console.log(event)
            if (event.type === "character") {

            } else if (event.type === "insets") {

            } else {
                const {action} = event;
                console.log(action)
                dispatchAssistantAction(action);
            }
        });

        assistant.on("start", (event) => {
            console.log(event)
        });

        return () => {
            assistant.close();
        }
    }, []);

    const new_recipe = (action) => {
        console.log(action)
        dispatch(addRecipe({
            id: Math.random().toString(36).substring(7),
            title: action.recipeTitle,
            description: '',
            ingredients: [],
            tags: []
        }));
    }

    const done_note = (action) => {
        dispatch(removeRecipe(action.id));
    }

    const _send_action_value = (action_id, value) => {
        const data = {
            action: {
                action_id: action_id,
                parameters: {
                    // значение поля parameters может быть любым, но должно соответствовать серверной логике
                    value: value, // см.файл src/sc/noteDone.sc смартаппа в Studio Code
                },
            },
        };
        const unsubscribe = this.assistant.sendData(data, (data) => {
            // функция, вызываемая, если на sendData() был отправлен ответ
            const {type, payload} = data;
            console.log('sendData onData:', type, payload);
            unsubscribe();
        });
    }

    return (
        <div className={`${s.app} ${recipesStore.isAddNewRecipeOn && s.three_column}`}>
            <FilterPanel/>
            <RecipeList/>
            {
                recipesStore.isAddNewRecipeOn && <AddingRecipePanel
                    recipe={recipesStore.recipes[recipesStore.editIdRecipe]}/>
            }
        </div>
    )
}

export default App;