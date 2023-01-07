import "./Selected.css"
import React, { useState, useEffect } from "react";
import axios from 'axios';
const Selected = (props) => {

    const [dataAPIChart, setDataAPIChart] = useState([])

    const url = `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=pln&days=1`

    console.log(url)

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setDataAPIChart(json));
    },[])

    console.log(dataAPIChart)

    return (
        <section className="selected">
            <p>{props.name} ({props.symbol})</p>
            <img src={props.image} alt={`${props.image} (${props.symbol})`}/>
            <div className="btn">Check Chart</div>
        </section>
    )
}
export default Selected