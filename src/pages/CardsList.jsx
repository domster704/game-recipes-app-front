import React from 'react';
import {AddCard} from '../components/AddCard';
import {CardItemList} from '../components/CardItemList';


export const CardsList = (props) => {
    const {items, onAdd, onDone} = props;
    return (
        <main className="container">
            <AddCard
                onAdd={onAdd}
            />
            <CardItemList
                items={items}
                onDone={onDone}
            />
        </main>
    )
}
