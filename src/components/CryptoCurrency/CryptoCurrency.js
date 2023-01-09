import "./CryptoCurrency.css"
import React from 'react'

const CryptoCurrency = ({id, selected, changeSelected, currentPrice, name, symbol, image}) => {

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



    return (
        <div id={`item-parent${id}`} className={selected.includes(id) ? "Item active" : "Item"}>
            <p>{name} ({symbol})</p>
            <p>{currentPrice} zł</p>
            <img src={image} alt={name} />
            <div className="btn" onClick={handleClick}>Select Currency</div>
        </div>
    );
}
export default CryptoCurrency;