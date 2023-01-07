import "./Content.css"
/*
import data from "../data"
*/
import Item from "../Item/Item"
import Selected from "../Selected/Selected"
import React, { useState, useEffect, useRef } from 'react'
const Content = () => {

    const [newData, setNewData] = useState( JSON.parse(localStorage.getItem("newData")) || [])
    const [count, setCount] = useState( JSON.parse(localStorage.getItem("count")) || 0)
    const [selected, setSelected] = useState(JSON.parse(localStorage.getItem("selected")) || 0)
    const [clicked, setClicked] = useState(JSON.parse(localStorage.getItem("clicked")) || [])
    const [tab, setTab] = useState(JSON.parse(localStorage.getItem("tab")) || false)
    const [dataAPI, setDataAPI] = useState([])

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=pln&order=market_cap_desc&per_page=100&page=1&sparkline=false")
            .then((response) => response.json())
            .then((json) => setDataAPI(json));
    },[])

    const changeCount = (prevCount) => {
        setCount(prevCount)
    }
    const changeClicked = (prevClicked) => {
        setClicked(prevClicked)
    }

    useEffect(() => {
        localStorage.setItem("count",JSON.stringify(count))
        },[count])

    useEffect(() => {
        function arrayComparison () {
            let arr = []
            for (let i = 0; i< dataAPI.length; i++) {
                if (clicked.includes(dataAPI[i].id)) {
                    arr.push(dataAPI[i])
                }}
            setNewData(arr)
            console.log(newData)
        }
            arrayComparison()
        },[clicked])

    const didMountClicked = useRef(false)
    useEffect(() => {
        if (didMountClicked.current){
            localStorage.setItem("clicked", JSON.stringify(clicked))
        }
        else {
            didMountClicked.current = true
        }
    }, [clicked])

    const didMount = useRef(false)
    const didMount2 = useRef(false)
    useEffect(() => {
        if (didMount.current && didMount2.current) {
            localStorage.setItem("newData", JSON.stringify(newData))
            setSelected(
                newData.map((item) => {
                    return (
                        <Selected
                            key={item.id}
                            item={item}
                        />
                    )
                }))

        } else if (didMount.current) {
            didMount2.current = true
        } else {
            didMount.current = true
        }
    },[newData])

    useEffect( () => {
        setSelected(
            newData.map((dataAPI) => {
                return (
                    <Selected
                        key = {dataAPI.id}
                        id = {dataAPI.id}
                        name = {dataAPI.name}
                        image = {dataAPI.image}
                        symbol = {dataAPI.symbol}
                        currentPrice = {dataAPI.current_price}
                    />
                )
            }))
    },[newData])

    useEffect(() => {
        localStorage.setItem("count",JSON.stringify(count))
    },[count])

    function clickTab () {
        setTab(!tab)
    }

    useEffect ( () => {
        localStorage.setItem("tab",JSON.stringify(tab))}
        ,[tab])

    return (
        <main>

            <div className={count ? "content-selected active" : "content-selected" }>
                <div className={tab ? "selected-currencies active" : "selected-currencies"}>{selected}</div>
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
                        count = {count}
                        changeCount = {changeCount}
                        clicked = {clicked}
                        changeClicked = {changeClicked}
                        item = {dataAPI}
                    />
                ))}
            </div>
        </main>
    );
}
export default Content