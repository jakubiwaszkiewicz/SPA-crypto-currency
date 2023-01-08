import "./Content.css"
/*
import data from "../data"
*/
import Item from "../Item/Item"
import Selected from "../Selected/Selected"
import React, { useState, useEffect, useRef } from 'react'
const Content = () => {

    const [selected, setSelected] = useState(JSON.parse(localStorage.getItem("selected")) || []);
    const [tab, setTab] = useState(JSON.parse(localStorage.getItem("tab")) || false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=pln&order=market_cap_desc&per_page=20&page=1&sparkline=false")
            .then((response) => response.json())
            .then((json) => setDataAPI(json));
    },[])


    const changeSelected = (prevSelected) => {
        setSelected(prevSelected);
    }

    const didMountSelected = useRef(false);

    useEffect(() => {
        if (didMountSelected.current){
            localStorage.setItem("selected", JSON.stringify(selected))
        }
        else {
            didMountSelected.current = true
        }
    }, [selected])

    useEffect(() => {
        localStorage.setItem("tab",JSON.stringify(tab))}
    ,[tab])

    return (
        <main>
            <div className={selected.length ? "content-selected active" : "content-selected" }>
                <div className={tab ? "selected-currencies active" : "selected-currencies"}>
                    {data.filter((crypto) => selected.includes(crypto.id)).map((dataAPI) => {
                        console.log('eeee');
                    return (
                        <Selected
                            key = {dataAPI.id}
                            id = {dataAPI.id}
                            name = {dataAPI.name}
                            image = {dataAPI.image}
                            symbol = {dataAPI.symbol}
                            currentPrice = {dataAPI.current_price}/>
                    )})}</div>
                <div className="selected-tab">
                    <p className="counter"></p>
                    <h5>Selected Currencies {count}/5</h5>
                    <div className={tab ? "dev-btn active" : "dev-btn"} onClick={clickTab}>
                        <div className="btn-bars btn-bar1">
                        </div>
                        <div className="btn-bars btn-bar2">
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                {dataAPI.map((dataAPI) => (
                    <Item
                        key = {dataAPI.id}
                        id = {dataAPI.id}
                        name = {dataAPI.name}
                        image = {dataAPI.image}
                        symbol = {dataAPI.symbol}
                        currentPrice = {dataAPI.current_price}
                        selected = {selected}
                        changeSelected = {changeSelected}
                        item = {dataAPI}
                    />
                ))}
            </div>
        </main>
    );
}
export default Content