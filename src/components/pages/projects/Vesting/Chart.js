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
import { Line } from 'react-chartjs-2';

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
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};



const options = {
    responsive: true,
    interaction: {
        intersect: false,
        axis: 'x'
    },
    plugins: {
        title: {
            display: true,
            text: (ctx) => 'Step ' + ctx.chart.data.datasets[0].stepped + ' Interpolation',
        }
    }
}


const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
        {
            label: 'Dataset',
            data: [10,20,30,40,50,60],
            borderColor: CHART_COLORS.red,
            fill: false,
            stepped: true,
        }
    ]
};

const actions = [
    {
        name: 'Step: false (default)',
        handler: (chart) => {
            chart.data.datasets.forEach(dataset => {
                dataset.stepped = false;
            });
            chart.update();
        }
    },
    {
        name: 'Step: true',
        handler: (chart) => {
            chart.data.datasets.forEach(dataset => {
                dataset.stepped = true;
            });
            chart.update();
        }
    },
    {
        name: 'Step: before',
        handler: (chart) => {
            chart.data.datasets.forEach(dataset => {
                dataset.stepped = 'before';
            });
            chart.update();
        }
    },
    {
        name: 'Step: after',
        handler: (chart) => {
            chart.data.datasets.forEach(dataset => {
                dataset.stepped = 'after';
            });
            chart.update();
        }
    },
    {
        name: 'Step: middle',
        handler: (chart) => {
            chart.data.datasets.forEach(dataset => {
                dataset.stepped = 'middle';
            });
            chart.update();
        }
    }
];

export function Chart() {
    return <Line options={options} data={data} actions={actions} />;
}