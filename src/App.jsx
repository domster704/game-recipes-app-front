import React from "react";
import {createAssistant, createSmartappDebugger,} from "@salutejs/client";
import "./voiceSberNewUI.css";
import {addRecipe, removeRecipe} from "./store/recipeSlice";
import {useDispatch, useSelector} from "react-redux";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import RecipeList from "./components/RecipeList/RecipeList";
import s from "./App.module.css";
import AddingRecipePanel from "./components/AddingRecipePanel/AddingRecipePanel";

const initializeAssistant = (getState /*: any*/, getRecoveryState) => {
    if (process.env.NODE_ENV === 'development') {
        return createSmartappDebugger({
            token: process.env.REACT_APP_TOKEN ?? '',
            initPhrase: `запусти ${process.env.REACT_APP_SMARTAPP}`,
            getState,
            nativePanel: {
                defaultText: '',
                screenshotMode: false,
                tabIndex: -1,
            },
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
            item_selector: {
                items: Object.keys(recipesStore.recipes).map((key) => {
                    return recipesStore.recipes[key]
                })
            },
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

        return ()  =>  {
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

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             cards: [],
//         }
//
//         this.assistant = initializeAssistant(() => this.getStateForAssistant());
//
//         this.assistant.on("data", (event/*: any*/) => {
//             if (event.type === "character") {
//
//             } else if (event.type === "insets") {
//
//             } else {
//                 const {action} = event;
//                 console.log(action)
//                 this.dispatchAssistantAction(action);
//             }
//         });
//
//         this.assistant.on("start", (event) => {
//             let initialData = this.assistant.getInitialData();
//         });
//
//         this.assistant.on("command", (event) => {
//         });
//
//         this.assistant.on("error", (event) => {
//         });
//
//         this.assistant.on("tts", (event) => {
//         });
//     }
//
//     componentDidMount() {
//     }
//
//     getStateForAssistant() {
//         return {
//             item_selector: {
//                 items: Object.keys(this.props.recipesStore.recipes).map((key) => {
//                     return this.props.recipesStore.recipes[key]
//                 })
//             },
//         };
//     }
//
//     dispatchAssistantAction(action) {
//         console.log(action)
//         if (!action) {
//             return
//         }
//
//         switch (action.type) {
//             case 'add_recipe':
//                 return this.new_recipe(action);
//             case 'done_note':
//                 return this.done_note(action);
//             default:
//                 return;
//         }
//     }
//
//     new_recipe(action) {
//         this.props.addRecipe({
//             id: Math.random().toString(36).substring(7),
//             title: action.recipeTitle,
//             description: '',
//             ingredients: [],
//             tags: []
//         });
//     }
//
//     done_note(action) {
//         this.props.removeRecipe(action.id);
//     }
//
//     _send_action_value(action_id, value) {
//         const data = {
//             action: {
//                 action_id: action_id,
//                 parameters: {
//                     // значение поля parameters может быть любым, но должно соответствовать серверной логике
//                     value: value, // см.файл src/sc/noteDone.sc смартаппа в Studio Code
//                 },
//             },
//         };
//         const unsubscribe = this.assistant.sendData(data, (data) => {
//             // функция, вызываемая, если на sendData() был отправлен ответ
//             const {type, payload} = data;
//             console.log('sendData onData:', type, payload);
//             unsubscribe();
//         });
//     }
//
//     play_done_note(id) {
//         const completed = this.props.recipesStore.recipes.find(({id}) => id)?.completed;
//         if (!completed) {
//             const texts = ['Молодец!', 'Красавчик!', 'Супер!'];
//             const idx = Math.random() * texts.length | 0;
//             this._send_action_value('done', texts[idx]);
//         }
//     }
//
//     delete_note(action) {
//         this.props.removeRecipe(action.id);
//     }
//
//     render() {
//         return (
//             <div className={`${s.app} ${this.props.recipesStore.isAddNewRecipeOn && s.three_column}`}>
//                 <FilterPanel/>
//                 <RecipeList/>
//                 {
//                     this.props.recipesStore.isAddNewRecipeOn && <AddingRecipePanel
//                         recipe={this.props.recipesStore.recipes[this.props.recipesStore.editIdRecipe]}/>
//                 }
//                 {/*{this.props.filterStore.isFilterOn && <FilterPanel isOpen={this.props.filterStore.isFilterOn}/>}*/}
//                 {/*<main className={s.container}>*/}
//                 {/*    <SearchRecipeBar*/}
//                 {/*        onAdd={(recipeTitle) => {*/}
//                 {/*            this.new_recipe({type: "add_note", recipeTitle});*/}
//                 {/*        }}*/}
//                 {/*    />*/}
//                 {/*    <RecipeList*/}
//                 {/*        items={Object.keys(this.props.recipesStore.recipes).map(key => this.props.recipesStore.recipes[key])}*/}
//                 {/*        onDone={(note) => {*/}
//                 {/*            this.play_done_note(note.id);*/}
//                 {/*            this.done_note({type: "done_note", id: note.id});*/}
//                 {/*        }}*/}
//                 {/*    />*/}
//                 {/*</main>*/}
//             </div>
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         recipesStore: state.recipes,
//         filterStore: state.filter,
//     }
// }
//
// const mapDispatchToProps = dispatch => {
//     return {
//         addRecipe: (action) => dispatch(addRecipe(action)),
//         removeRecipe: (action) => dispatch(removeRecipe(action))
//     }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;