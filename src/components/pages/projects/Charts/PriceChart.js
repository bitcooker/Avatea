import React, {useEffect, useState} from 'react';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
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
            label: 'Price',
            data: [0],
            borderColor: CHART_COLORS.primary,
            fill: false,
            stepped: true,
        }
    ]
};


export function PriceChart(props) {
    const [chartData, setChartData] = useState(data);
    const [chartOptions, setChartOptions] = useState(options);


    useEffect(() => {
        let tickerData = props.tickerData


        let labels = [];
        let values = [];

        for (var k = 0; k < tickerData.length; k++) {
            labels[k] = tickerData[k].timestamp;
            values[k] = tickerData[k].value;
        }

        const newData = {
            labels: labels,
            datasets: [
                {
                    label: 'Price',
                    data: values,
                    borderColor: CHART_COLORS.primary,
                }
            ]
        };

        setChartData(newData)

    }, [props]);

    return <Line options={chartOptions} data={chartData}/>;
}