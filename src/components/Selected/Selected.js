import "./Selected.css"
import React, { useState, useEffect } from "react";
import Chart from './Chart/Chart'

const Selected = ({id, name, image, symbol, currentPrice}) => {

    const [dataChart, setDataChart] = useState([])
    const [visible, setVisible] = useState(true)

    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=pln&days=1`

    function clickHandler () {
        setVisible(!visible)
    }

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setDataChart(json));
    },[url])

    return (
        <section className="selected">
            <p>{name} ({symbol})</p>
            <p>{currentPrice} zł</p>
            <img src={image} alt={`${image} (${symbol})`}/>
            <div className="btn" onClick={clickHandler}>Check Chart</div>
            <section className={visible ? "chartContainer" : "chartContainer active"}>
                <Chart
                    visible = {visible}
                    data = {dataChart.prices}
                    name = {name}
                />
            </section>
        </section>
    )
}
export default Selected