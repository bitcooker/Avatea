import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {useState, useEffect} from "react";
import tailwindConfig from '../../../../../tailwind.config';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CHART_COLORS = {
    primary: tailwindConfig.theme.extend.colors.indigo["500"],
    black: '#000000',
};


const options = {
    responsive: true,
    interaction: {
        intersect: false,
        axis: 'x'
    },
    scales: {
        x: {
            ticks: {
                callback: function (label) {
                    return `${this.getLabelForValue(label)}`.substring(0, 11)
                }
            }
        },
        y: {
            ticks: {
                callback: function (value, index, ticks) {
                    return value;
                }
            }
        }
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            displayColors: false,
        }
    }
}


const data = {
    labels: [0],
    datasets: [
        {
            label: 'Released tokens',
            data: [0],
            borderColor: CHART_COLORS.primary,
            fill: false,
            stepped: true,
        }
    ]
};


export function Chart(props) {
    const [chartData, setChartData] = useState(data);
    const [chartOptions, setChartOptions] = useState(options);


    useEffect(() => {
        let start = parseInt(props.start)
        let cliff = parseInt(props.cliff)
        let duration = parseInt(props.duration)
        let slicePeriodSeconds = parseInt(props.slicePeriodSeconds)
        let amountVested = parseFloat(props.amountVested)
        let ticker = props.ticker


        if (amountVested > 0 && slicePeriodSeconds > 0 && duration > 0) {

            let newOptions = options

            newOptions["scales"]["y"]["ticks"] = ({
                callback: function (value, index, ticks) {
                    return value + ' ' + ticker;
                }
            })

            setChartOptions(newOptions)

            let stepped = true
            let time_step = slicePeriodSeconds
            const maxAmountOfTickers = 100

            if (duration / slicePeriodSeconds > maxAmountOfTickers) {
                stepped = false
                time_step = parseInt(slicePeriodSeconds * (duration / slicePeriodSeconds) / maxAmountOfTickers)
            }

            function vesting(currentTime) {
                if (currentTime < cliff) return 0
                else if (currentTime >= start + duration) {
                    return amountVested
                } else {
                    let timeFromStart = currentTime - start;
                    let vestedSlicePeriods = parseInt(timeFromStart / slicePeriodSeconds);
                    let vestedSeconds = vestedSlicePeriods * slicePeriodSeconds;
                    return Math.floor((amountVested * vestedSeconds / duration) * 100) / 100;
                }
            }

            function timeConverter(UNIX_timestamp) {
                const a = new Date(UNIX_timestamp * 1000);
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const year = a.getFullYear();
                const month = months[a.getMonth()];
                const date = a.getDate();
                const hour = a.getHours();
                const min = a.getMinutes();
                const sec = a.getSeconds();
                return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
            }


            let data_points = []

            let time = start

            while (time <= start + duration + slicePeriodSeconds) {

                data_points.push({
                    "timestamp": time,
                    "labels": timeConverter(time),
                    "values": vesting(time),
                    "colors": CHART_COLORS.primary,
                    "pointRadius": 3

                })

                time += time_step
            }

            const currentDate = new Date();
            const now = Math.floor(currentDate.getTime() / 1000);

            data_points.push({
                "timestamp": now,
                "labels": 'Now',
                "values": vesting(now),
                "colors": CHART_COLORS.black,
                "pointRadius": 5
            })

            data_points.sort(function (a, b) {
                return ((a.timestamp < b.timestamp) ? -1 : ((a.timestamp === b.timestamp) ? 0 : 1));
            });

            let labels = [];
            let colors = [];
            let values = [];
            let pointRadius = [];

            for (var k = 0; k < data_points.length; k++) {
                labels[k] = data_points[k].labels;
                values[k] = data_points[k].values;
                colors[k] = data_points[k].colors;
                pointRadius[k] = data_points[k].pointRadius;
            }


            const newData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Released ' + ticker,
                        data: values,
                        borderColor: colors,
                        fill: false,
                        stepped: stepped,
                        pointBackgroundColor: colors,
                        pointRadius: pointRadius
                    }
                ]
            };

            setChartData(newData)
        }
    }, [props]);

    return <Line options={chartOptions} data={chartData}/>;
}