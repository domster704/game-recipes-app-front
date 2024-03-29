import React from "react";

import "../App.css";

export class AddCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            note: '',
        }
    }

    render() {
        const {onAdd} = this.props;

        return (
            <form className="form_add_recipe" onSubmit={(event) => {
                event.preventDefault();
                onAdd(this.state.note);
                this.setState({
                    note: '',
                })
            }}>
                <input
                    className="add-task"
                    type="text"
                    placeholder="Поиск..."
                    value={this.state.note}
                    onChange={({target: {value}}) => this.setState({
                        note: value,
                    })}
                    autoFocus
                />
                <p>Описание проекта и сервиса, либо просто описание тупое, потом текст наклепаю, либо мб еще добавить
                    прогерскую инфу.
                    Ниже отображается список ласт добавленных</p>
            </form>
        )
    }

}

