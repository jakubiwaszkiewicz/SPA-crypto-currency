import './CryptoCurrency.css';
import React from 'react';
/**
 *
 * @component
 * The component is for display a cord of the cryptocurrency with interactive button for selecting currencies and some
 * essential information about it.
 * @param {string} id- ID of the currency.
 * @param {array} selected- Storing a selected items.
 * @param {function} changeSelected- Changing value of the `selected`
 * @param {string} currentPrice- Display a value of the currency
 * @param {string} name- Display a name of the currency
 * @param {string} symbol- Display a symbol of the currency.
 * @param {string} image- Display an image of the currency.
 * @return {object} Display a card of the cryptocurrency
 */
const CryptoCurrency = ({
    id,
    selected,
    changeSelected,
    currentPrice,
    name,
    symbol,
    image,
}) => {
    /**This function has the goal of verifying if the currency's `id` is present in the array.
     * If it is not, it will add the `id` of the chosen cryptocurrency to the `selected` array and
     * send it to the `Content.js` component. In the `Content.js` component,
     * data from the API will be mapped and filtered to show the appropriate currency card
     * in the selected-currencies div container. The function will also alter the color of the currency card and
     * check if there are less than 6 elements in the array.
     * @function handleClick
     * @return {array} selected*/
    const handleClick = () => {
        if (selected.includes(id)) {
            changeSelected((prevState) => {
                const idToRemove = prevState.indexOf(id);
                prevState.splice(idToRemove, 1);
                return [...prevState];
            });
        } else {
            if (selected.length <= 4) {
                changeSelected((prevState) => [...prevState, id]);
            }
        }
    };

    return (
        <div className={selected.includes(id) ? 'Item active' : 'Item'}>
            <p>
                {name} ({symbol})
            </p>
            <p>{currentPrice} zł</p>
            <img src={image} alt={name} />
            <div className="btn" onClick={handleClick}>
                Select Currency
            </div>
        </div>
    );
};
export default CryptoCurrency;
