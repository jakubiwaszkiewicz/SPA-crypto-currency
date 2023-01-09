import './Chart.css';
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';


/**
 * Component which render a chart after clicking the "Check Chart" button.
 * @component
 * @param {boolean} visible - make chart visible on click the "Check Chart" button
 * @param {object} data- essential data to make a market chart
 * @param {string} name- display a name of the currency
 */
const Chart = ({ visible, data, name }) => {
    const dataChart = [];
    if (typeof data !== 'undefined') {
        for (let i = 0; i < data.length; i++) {
            const date = new Date(data[i][0]);
            const price = data[i][1].toFixed(2);
            const initialObject = {
                date: date.getTime(),
                price: price,
            };

            dataChart.push(initialObject);
        }
    }

    const dateFormatter = (date) => {
        return format(new Date(date), 'k:mm d-MM');
    };

    const customizedAxisTick = ({ x, y, payload }) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    fill="#666"
                    transform="rotate(-35)"
                >
                    {dateFormatter(payload.value)}
                </text>
            </g>
        );
    };

    return (
        <div className={visible ? 'chart active' : 'chart'}>
            <h5>{name} 24h price [PLN]</h5>
            <ResponsiveContainer aspect={2}>
                <LineChart
                    data={dataChart}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 20,
                        bottom: 35,
                    }}
                >
                    <XAxis
                        dataKey="date"
                        domain={['dataMIN', 'dataMAX']}
                        name="Last 24h"
                        type="number"
                        tickCount="12"
                        tickFormatter={dateFormatter}
                        tick={customizedAxisTick}
                    />
                    <YAxis
                        dataKey="price"
                        domain={['dataMIN', 'dataMAX']}
                        tickCount="10"
                        name="Price [PLN]"
                    />
                    <Legend verticalAlign="top" />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#7289da"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
export default Chart;
