
import "./Item.css"
import React from 'react'
import { useState, useEffect, useRef } from 'react'
const Item = (props) => {

    const id = props.id

    const [click, setClick] = useState(() => {
        const saved = localStorage.getItem(`isClicked${id}`)
        const initialValue = JSON.parse(saved)
        return initialValue || false
    })

    const handleClick = () => {
        if (props.count <= 4) {
            setClick(!click)
        } else {
            if (click) {
                setClick(!click)
            } else {
                console.log("nie możesz zaznaczyć więcej itemów")
            }
        }
    }

    const didMount = useRef(false)

    useEffect(() => { // do zmieniania count i zapisywania ich w storage'u
        if (didMount.current) {
            if (click) {
                props.changeCount(props.count+1)
                props.changeClicked(
                    [
                        ...props.clicked,
                        id
                    ]
                )
            } else {
                props.changeCount(props.count-1)
                props.changeClicked(
                    props.clicked.filter(
                        x => x !== id
                    )
                )
            }
            localStorage.setItem(`isClicked${id}`,JSON.stringify(click))
        } else didMount.current = true
    },[click])

    useEffect(() => { // do rerenderingu strony, aby otrzymać pokolorowane selected itemy
        const item = document.getElementById(`item-parent${id}`)
        const saved = localStorage.getItem(`isClicked${id}`)
        const initialValue = JSON.parse(saved)
        if (initialValue) {
            item.classList.add("active")
        }
    }, [])

    return (
        <div id={`item-parent${id}`} className={click ? "Item active" : "Item"}>
            <p>{props.item.name} ({props.item.abbreviation})</p>
            <img src={props.item.img} alt={props.item.name} />
            <div className="btn" onClick={handleClick}>Select Currency</div>
        </div>
    );
}
export default Item;