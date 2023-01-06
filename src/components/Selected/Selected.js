import "./Selected.css"
import React, { useState, useEffect } from "react";
import axios from 'axios';
const Selected = (props) => {

    const [dataAPIChart, setDataAPIChart] = useState()

    const url = `https://api.coingecko.com/api/v3/coins/${props.item.idgecko}/market_chart?vs_currency=usd&days=1`

    useEffect(() => {
        axios.get(url).then((response) => {
            setDataAPIChart(response.data)
        }).catch((error) => {
            console.log(error)
        })
    },[])

    console.log(dataAPIChart)

    return (
        <section className="selected">
            <p>{props.item.name} ({props.item.abbreviation})</p>
            <img src={props.item.img} alt={`${props.item.img} (${props.item.abbreviation})`}/>
            <div className="btn">Check Chart</div>
        </section>
    )
}
export default Selected