import "./Selected.css"
import React, { useState, useEffect, useRef } from "react";
import Chart from './Chart/Chart'

const Selected = ({id, name, image, symbol, currentPrice, selected, changeSelected}) => {

    const [dataAPIChart, setDataAPIChart] = useState([])
    const [visible, setVisible] = useState(true)

    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=pln&days=1`

    function clickHandler () {
        setVisible(!visible)
    }

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setDataAPIChart(json));
    },[])

    return (
        <section className="selected">
            <p>{name} ({symbol})</p>
            <p>{currentPrice}</p>
            <img src={image} alt={`${image} (${symbol})`}/>
            <div className="btn" onClick={clickHandler}>Check Chart</div>
            <Chart
                visible = {visible}
                data = {dataAPIChart.prices}
                name = {name}
            />
        </section>
    )
}
export default Selected