import "./Chart.css"
import React, { useState, useEffect, PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from "date-fns";

const Chart = ({visible, data, name}) => {
    const dataChart = []
    if (typeof(data) !== 'undefined') {
        for (let i = 0; i < data.length; i++) {
            const date = new Date(data[i][0]);
            const hour = date.getHours()
            const day = date.getDate()
            const price = data[i][1].toFixed(2)
            const initialObject = {
                date: date.getTime(),
                price: price,
            }

            dataChart.push(initialObject)
        }
    }

    const dateFormatter = (date) => {
        return format(new Date(date), "k:mm d-MM");
    };

    const customizedAxisTick = ({ x, y, stroke, payload }) => {
            return (
                <g transform={`translate(${x},${y})`}>
                    <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                        {dateFormatter(payload.value)}
                    </text>
                </g>
            );
        }


    return (
        <div className={visible ? "chart active" : "chart"}>
            <h5>{name} 24h price [PLN]</h5>

            <ResponsiveContainer aspect={1.7}>
                <LineChart
                    width={1000}
                    height={500}
                    data={dataChart}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 50
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