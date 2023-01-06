import "./Content.css"
import data from "../data"
import Item from "../Item/Item"
import Selected from "../Selected/Selected"
import React, { useState, useEffect, useRef } from 'react'
const Content = () => {

    const [newData, setNewData] = useState( JSON.parse(localStorage.getItem("newData")) || [])
    const [count, setCount] = useState( JSON.parse(localStorage.getItem("count")) || 0)
    const [selected, setSelected] = useState(JSON.parse(localStorage.getItem("selected")) || 0)
    const [clicked, setClicked] = useState(JSON.parse(localStorage.getItem("clicked")) || [])
    const [tab, setTab] = useState(JSON.parse(localStorage.getItem("tab")) || false)

    const changeCount = (prevCount) => {
        setCount(prevCount)
    }
    const changeClicked = (prevClicked) => {
        setClicked(prevClicked)
    }

    useEffect(() => {
        localStorage.setItem("count",JSON.stringify(count))
        if (count === 0) {

        }

        },[count])

    useEffect(() => {
        function arrayComparison () {
            let arr = []
            for (let i = 0; i< data.length; i++) {
                if (clicked.includes(data[i].id)) {
                    arr.push(data[i])
                }}
            setNewData(arr)
            console.log("clicked, po sprawdzeniu i stworzeniu tablicy arr:", clicked)
        }
            arrayComparison()
        },[clicked])

    const didMountClicked = useRef(false)
    useEffect(() => {
        if (didMountClicked.current){
            console.log("clicked, zapisywanie:", clicked)
            localStorage.setItem("clicked", JSON.stringify(clicked))
        }
        else {
            didMountClicked.current = true
            console.log("clicked, zapisywanie - pierwszy render:", clicked)
        }
    }, [clicked])

    const didMount = useRef(false)
    const didMount2 = useRef(false)
    useEffect(() => {
        if (didMount.current && didMount2.current) {
            localStorage.setItem("newData", JSON.stringify(newData))
            console.log(newData)
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
            newData.map((item) => {
                return (
                    <Selected
                        key={item.id}
                        item={item}
                    />
                )
            }))
    },[])

    useEffect(() => {
        localStorage.setItem("count",JSON.stringify(count))
    },[count])

    const content = data.map((item) => {
            return (
                <Item
                    key = {item.id}
                    id = {item.id}
                    count = {count}
                    changeCount = {changeCount}
                    clicked = {clicked}
                    changeClicked = {changeClicked}
                    item = {item}
                />
            )
        }
    )

    function clickTab () {
        setTab(!tab)
    }

    useEffect ( () => {
        localStorage.setItem("tab",JSON.stringify(tab))}
        ,[tab])

    return (
        <main>
            <p className="counter">{count}/5</p>
            <div className={count ? "content-selected.active" : "content-selected" }>
                <div className={tab ? "selected-currencies.active" : "selected-currencies"}>{selected}</div>
                <div className="selected-tab"><span>Selected Currencies</span><div className="developing-btn" onClick={clickTab}>button</div></div>
            </div>

            <div className="content">
                {content}
            </div>
        </main>
    );
}
export default Content