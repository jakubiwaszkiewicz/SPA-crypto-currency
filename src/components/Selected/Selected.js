import "./Selected.css"
import React, { useState, useEffect, PureComponent } from "react";
import Chart from './Chart/Chart'
import axios from 'axios';
const Selected = (props) => {

    const [dataAPIChart, setDataAPIChart] = useState([])
    const [visible, setVisible] = useState(true)

    const url = `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=pln&days=1`

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
            <p>{props.name} ({props.symbol})</p>
            <img src={props.image} alt={`${props.image} (${props.symbol})`}/>
            <div className="btn" onClick={clickHandler}>Check Chart</div>
            <Chart
                visible = {visible}
                data = {dataAPIChart.prices}
                name = {props.name}
            />
        </section>
    )
}
export default Selected