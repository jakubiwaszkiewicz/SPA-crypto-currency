import "./Selected.css"
import React from "react";

const Selected = (props) => {

    return (
        <section className="selected">
            <p>{props.item.name} ({props.item.abbreviation})</p>
            <img src={props.item.img}/>
            <div className="btn">Check Chart</div>
        </section>
    )
}
export default Selected