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
            } else if (event.type === "insets") {
            } else {
                const {action} = event;
                console.log('xd', action, event)
                this.dispatchAssistantAction(action);
            }
        });

        this.assistant.on("start", (event) => {
            let initialData = this.assistant.getInitialData();
        });

        this.assistant.on("command", (event) => {
        });

        this.assistant.on("error", (event) => {
        });

        this.assistant.on("tts", (event) => {
        });

    }

    componentDidMount() {
    }

    getStateForAssistant() {
        return {
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
    }

    dispatchAssistantAction(action) {
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
        console.log(this.state.cards)
        let notes = this.state.cards?.length > 0 ? this.state.cards : [];
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
            notes: this.state.cards.map((note) =>
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
        const completed = this.state.cards.find(({id}) => id)?.completed;
        if (!completed) {
            const texts = ['Молодец!', 'Красавчик!', 'Супер!'];
            const idx = Math.random() * texts.length | 0;
            this._send_action_value('done', texts[idx]);
        }
    }

    delete_note(action) {
        this.setState({
            notes: this.state.cards.filter(({id}) => id !== action.id),
        })
    }

    render() {
        return (
            <CardsList
                items={this.state.cards}
                onAdd={(note) => {
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

