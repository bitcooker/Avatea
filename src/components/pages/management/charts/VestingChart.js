import React, {useEffect, useState} from 'react';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

// page components
import Card from "../../../pages/management/projectDetail/Card/Card";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
);


const options = {
    responsive: true,
    plugins: {
        plugins: {
            legend: {
                position: 'top',
            },
        }
    }
}


export function VestingChart(props) {
    const [chartData, setChartData] = useState({labels: [], datasets: []});
    const [chartOptions, setChartOptions] = useState(options);


    useEffect(() => {
        let vestingData = props.vestingData

        let labels = [];
        let data_total = {label: 'Total', data: [], backgroundColor: '#334A6F'}
        let data_released = {label: 'Released', data: [], backgroundColor: '#62929E'}
        let data_sold = {label: 'Sold', data: [], backgroundColor: '#C6C5B9'}
        let data_liquidity = {label: 'Liquidity', data: [], backgroundColor: '#546A7B'}

        for (var key in vestingData) {
            labels.push(key)
            data_total.data.push(vestingData[key].total)
            data_released.data.push(vestingData[key].released)
            data_sold.data.push(vestingData[key].sold)
            data_liquidity.data.push(vestingData[key].liquidity)
        }

        const data = {
            labels: labels,
            datasets: [
                data_total,
                data_released,
                data_sold,
                data_liquidity,

            ]
        };

        setChartData(data);

    }, [props]);

    return (
        <Card>
            <Bar options={chartOptions} data={chartData}/>
        </Card>
    );
}