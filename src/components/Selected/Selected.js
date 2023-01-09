import './Selected.css';
import React, { useState, useEffect } from 'react';
import Chart from './Chart/Chart';
/**
 *
 * @component
 * This component is used to show a currency card and a button that can be interacted with to display a market chart.
 * It also gathers important data necessary for creating the chart.
 * @param {string} id- ID of the currency.
 * @param {array} selected- State, storing a selected items.
 * @param {string} currentPrice- Display a value of the currency.
 * @param {string} name- Display a name of the currency.
 * @param {string} symbol- Display a symbol of the currency.
 * @param {string} image- Display an image of the currency.
 * @return {object} Display a card of the cryptocurrency.
 */
const Selected = ({ id, name, image, symbol, currentPrice }) => {
    const [dataChart, setDataChart] = useState([]);
    const [visible, setVisible] = useState(true);

    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=pln&days=1`;

    function clickHandler() {
        setVisible(!visible);
    }

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setDataChart(json));
    }, [url]);

    return (
        <section className="selected">
            <p>
                {name} ({symbol})
            </p>
            <p>{currentPrice} zł</p>
            <img src={image} alt={`${image} (${symbol})`} />
            <div className="btn" onClick={clickHandler}>
                Check Chart
            </div>
            <section
                className={visible ? 'chartContainer' : 'chartContainer active'}
            >
                <Chart visible={visible} data={dataChart.prices} name={name} />
            </section>
        </section>
    );
};
export default Selected;
