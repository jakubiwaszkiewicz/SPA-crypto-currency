
import "./Item.css"
import React from 'react'
import { useState, useEffect, useRef } from 'react'
const Item = ({id, selected, changeSelected, currentPrice, name, symbol, image}) => {

    const handleClick = () => {
        if (selected.includes(id)) {
            changeSelected(prevState => {
                const idToRemove = prevState.indexOf(id);
                prevState.splice(idToRemove, 1)
                return [...prevState];
            })
        }
        else {
        if (selected.length <= 4) {
           changeSelected(prevState => [...prevState, id])
        }}
    }

    useEffect(() => {
        const item = document.getElementById(`item-parent${id}`)
        const initialValue = JSON.parse(localStorage.getItem(`isClicked${id}`))
        if (initialValue) {
            item.classList.add("active")
        }
    }, [])

    return (
        <div id={`item-parent${id}`} className={click ? "Item active" : "Item"}>
            <p>{props.name} ({props.symbol})</p>
            <p>{props.currentPrice} zł</p>
            <img src={props.image} alt={props.name} />
            <div className="btn" onClick={handleClick}>Select Currency</div>
        </div>
    );
}
export default Item;