import {createAssistant, createSmartappDebugger,} from "@salutejs/client";

import "./App.css";
import {CardsList} from "./pages/CardsList";
import React from "react";

import {useDispatch, useSelector} from "react-redux";
import {addRecipe, removeRecipe} from "./store/recipeSlice";

const initializeAssistant = (getState, functions) => {
    if (process.env.NODE_ENV === "development") {
        return createSmartappDebugger({
            token: process.env.REACT_APP_TOKEN ?? "",
            initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
            getState,
        });
    }
    return createAssistant({getState});
};

export const App_func = () => {
    let dispatch = useDispatch();
    let recipesStore = useSelector((state) => state.recipes);

    let [assistant, setAssistant] = React.useState(initializeAssistant(() => getStateForAssistant(), {
        dispatchAssistantAction: dispatchAssistantAction
    }));

    assistant.on("start", (event) => {
        let initialData = assistant.getInitialData();
    });

    assistant.on("command", (event) => {
    });

    assistant.on("error", (event) => {
    });

    assistant.on("tts", (event) => {
    });

    assistant.on("data", (event/*: any*/) => {
        if (event.type === "character") {

        } else if (event.type === "insets") {

        } else {
            const {action} = event;
            dispatchAssistantAction(action);
        }
    });

    const getStateForAssistant = () => {
        return {
            item_selector: {
                items: recipesStore.recipes.map(
                    ({id, question, answer}, index) => ({
                        number: index + 1,
                        id,
                        question,
                        answer
                    })
                ),
            },
        };
    }

    const dispatchAssistantAction = action => {
        console.log(action)
        if (action) {
            switch (action.type) {
                case 'add_note':
                    return new_card(action);
                case 'done_note':
                    return done_note(action);
                default:
                    throw new Error();
            }
        }
    }

    const new_card = action => {
        dispatch(addRecipe({
            id: Math.random().toString(36).substring(7),
            title: action.note,
            completed: false,
        }));
    }

    const done_note = action => {
        dispatch(removeRecipe(action.id));
    }

    const _send_action_value = (action_id, value) => {
        const data = {
            action: {
                action_id: action_id,
                parameters: {   // значение поля parameters может любым, но должно соответствовать серверной логике
                    value: value, // см.файл src/sc/noteDone.sc смартаппа в Studio Code
                }
            }
        };
        const unsubscribe = assistant.sendData(
            data,
            (data) => {   // функция, вызываемая, если на sendData() был отправлен ответ
                const {type, payload} = data;
                unsubscribe();
            });
    }

    const play_done_note = id => {
        const completed = recipesStore.recipes.find(({id}) => id)?.completed;
        if (!completed) {
            const texts = ['Молодец!', 'Красавчик!', 'Супер!'];
            const idx = Math.random() * texts.length | 0;
            _send_action_value('done', texts[idx]);
        }
    }

    const delete_note = action => {
        dispatch(removeRecipe(action.id))
        // this.setState({
        //     notes: recipesStore.recipes.filter(({id}) => id !== action.id),
        // })
    }

    return (
        <CardsList
            items={recipesStore.recipes}
            onAdd={(note) => {
                new_card({type: "add_note", note});
            }}
            onDone={(note) => {
                play_done_note(note.id);
                done_note({type: "done_note", id: note.id});
            }}
        />
    );
}

