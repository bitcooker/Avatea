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
import {Chart} from 'react-chartjs-2';
// import { Chart } from 'chart.js';
import {ChoroplethController, ColorScale, GeoFeature, ProjectionScale, topojson} from 'chartjs-chart-geo';

ChartJS.register(
    ChoroplethController, GeoFeature, ColorScale, ProjectionScale
);


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


export function GeoChart(props) {
    const [chartData, setChartData] = useState({labels: [], datasets: []});
    const [chartOptions, setChartOptions] = useState(options);


    useEffect(() => {

        fetch('https://unpkg.com/world-atlas/countries-50m.json').then((r) => r.json()).then((data) => {
            const countries = topojson.feature(data, data.objects.countries).features;


            const chart = new Chart(document.getElementById("canvas").getContext("2d"), {
                type: 'choropleth',
                data: {
                    labels: countries.map((d) => d.properties.name),
                    datasets: [{
                        label: 'Countries',
                        data: countries.map((d) => ({feature: d, value: Math.random()})),
                    }]
                },
                options: {
                    showOutline: true,
                    showGraticule: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                    },
                    scales: {
                        xy: {
                            projection: 'equalEarth'
                        }
                    }
                }
            });
        });

    }, [props]);

    return <canvas id="canvas"></canvas>;
}