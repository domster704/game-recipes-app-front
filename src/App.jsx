import React from "react";
import {createAssistant, createSmartappDebugger,} from "@salutejs/client";

import "./App.css";
import {CardsList} from './pages/CardsList';


const initializeAssistant = (getState/*: any*/) => {
    if (process.env.NODE_ENV === "development") {
        return createSmartappDebugger({
            token: process.env.REACT_APP_TOKEN ?? "",
            initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
            getState,
        });
    }
    return createAssistant({getState});
};


export class App extends React.Component {
    constructor(props) {
        super(props);
        console.log('constructor');

        this.state = {
            cards: [],
        }

        this.assistant = initializeAssistant(() => this.getStateForAssistant());

        this.assistant.on("data", (event/*: any*/) => {
            if (event.type === "character") {
                // console.log(`assistant.on(data): character: "${event?.character?.id}"`);
            } else if (event.type === "insets") {
                // console.log(`assistant.on(data): insets`);
            } else {
                const {action} = event;
                console.log('xd', action, event)
                this.dispatchAssistantAction(action);
            }
        });

        this.assistant.on("start", (event) => {
            let initialData = this.assistant.getInitialData();
            // console.log(`assistant.on(start)`, event, initialData);
        });

        this.assistant.on("command", (event) => {
            // console.log(`assistant.on(command)`, event);
        });

        this.assistant.on("error", (event) => {
            // console.log(`assistant.on(error)`, event);
        });

        this.assistant.on("tts", (event) => {
            // console.log(`assistant.on(tts)`, event);
        });

    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    getStateForAssistant() {
        // console.log('getStateForAssistant: this.state:', this.state)
        const state = {
            item_selector: {
                items: this.state.cards.map(
                    ({id, question, answer}, index) => ({
                        number: index + 1,
                        id,
                        question,
                        answer
                    })
                ),
            },
        };
        // console.log('getStateForAssistant: state:', state)
        return state;
    }

    dispatchAssistantAction(action) {
        // console.log('dispatchAssistantAction', action);
        console.log(action)
        if (action) {
            switch (action.type) {
                case 'add_note':
                case 'new_card':
                    return this.new_card(action);
                case 'wrong_answer':
                    return this.wrong_answer(action);
                case 'right_answer':
                    return this.right_answer(action);
                default:
                    throw new Error();
            }
        }
    }

    new_card(action) {
        console.log('new_card', action);
        console.log(this.state.notes)
        let notes = this.state.notes?.length > 0 ? this.state.notes : [];
        this.setState({
            cards: [
                ...notes,
                {
                    id: Math.random().toString(36).substring(7),
                    title: action.note,
                    completed: false,
                },
            ],
        })
    }

    done_note(action) {
        console.log('done_note', action);
        this.setState({
            notes: this.state.notes.map((note) =>
                (note.id === action.id)
                    ? {...note, completed: !note.completed}
                    : note
            ),
        })
    }

    _send_action_value(action_id, value) {
        const data = {
            action: {
                action_id: action_id,
                parameters: {   // значение поля parameters может любым, но должно соответствовать серверной логике
                    value: value, // см.файл src/sc/noteDone.sc смартаппа в Studio Code
                }
            }
        };
        const unsubscribe = this.assistant.sendData(
            data,
            (data) => {   // функция, вызываемая, если на sendData() был отправлен ответ
                const {type, payload} = data;
                console.log('sendData onData:', type, payload);
                unsubscribe();
            });
    }

    play_done_note(id) {
        const completed = this.state.notes.find(({id}) => id)?.completed;
        if (!completed) {
            const texts = ['Молодец!', 'Красавчик!', 'Супер!'];
            const idx = Math.random() * texts.length | 0;
            this._send_action_value('done', texts[idx]);
        }
    }

    delete_note(action) {
        console.log('delete_note', action);
        this.setState({
            notes: this.state.notes.filter(({id}) => id !== action.id),
        })
    }

    render() {
        // console.log('render');
        return (
            <CardsList
                items={this.state.notes}
                onAdd={(note) => {
                    // this.add_note();
                    // dispatch({type: "add_note", note})
                    this.new_card({type: "add_note", note});
                }}
                onDone={(note) => {
                    this.play_done_note(note.id);
                    this.done_note({type: "done_note", id: note.id});
                }}
            />
        )
    }
}

