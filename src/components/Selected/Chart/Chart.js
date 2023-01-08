import "./Chart.css"
import React, { useState, useEffect, PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Chart = ({visible, data, name}) => {
    const dataChart = []
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
        <div className={visible ? "chart active" : "chart"}>
            <h5>{name} 24h price [PLN]</h5>

            <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={1000}
                height={500}
                data={dataChart}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <XAxis
                    dataKey="date"
                    domain={["dataMIN", "dataMAX"]}
                    name="Last 24h"
                    type="number"
                    tickCount = "12"
                    tickFormatter={dateFormatter}
                    tick={customizedAxisTick}
                />
                <YAxis
                    dataKey="price"
                    domain={["dataMIN", "dataMAX"]}
                    tickCount = "10"
                    name="Price [PLN]"
                />
                <Legend
                    verticalAlign="top"
                />
                <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#7289da"
                    dot={false}
                />
            </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
export default Chart