import "./Chart.css"
import React, { useState, useEffect, PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Chart = (props) => {
    const data = props.data
    let dataChart = []
    if (typeof(data) !== 'undefined') {
        for (let i = 0; i < data.length; i++) {
            let date = new Date(data[i][0]);
            let hour = date.getHours()
            let day = date.getDate()
            const price = data[i][1].toFixed(2)
            const initialObject = {
                time: hour,
                price: `${price}`,
            }
            dataChart.push(initialObject)
        }
    }

    return (
        <div className={props.visible ? "chart active" : "chart"}>
            <h5>{props.name} 24h price [PLN]</h5>
            <LineChart
                width={1200}
                height={500}
                data={dataChart}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                {/*<CartesianGrid strokeDasharray="3 3" />*/}
                {/*<XAxis
                    dataKey="time"
                    domain={["dataMIN", "dataMAX"]}
                    name="Last 24h"
                    type='category'
                />*/}
                <YAxis
                    dataKey="price"
                    domain={["dataMIN", "dataMAX"]}
                    tickCount = "10"
                    name="Price [PLN]"
                />
                {/*<Tooltip />*/}
                <Legend />
                <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#7289da"
                    dot={false}
                />
            </LineChart>
        </div>
    )
}
export default Chart