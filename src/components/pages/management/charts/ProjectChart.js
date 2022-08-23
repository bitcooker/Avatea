import React, {useEffect, useState} from 'react';
import {Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip} from 'chart.js';
import {Radar} from 'react-chartjs-2';


ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

// page components
import Card from "../../../pages/management/projectDetail/Card/Card";

export function ProjectChart(props) {
    const [chartData, setChartData] = useState({labels: [], datasets: []});


    useEffect(() => {
        let projectData = props.projectData

        let data = {
            labels: ['Selling', 'Buying', 'Liquidity', 'Vault', 'Vested'],
            datasets: [
                {
                    label: '# of Users',
                    data: [
                        projectData.users_selling_amount,
                        projectData.users_buying_amount,
                        projectData.liquidity_staked,
                        projectData.vault_staked,
                        projectData.vested,
                    ],
                    backgroundColor: 'rgba(51, 74, 111, 0.2)',
                    borderColor: 'rgba(51, 74, 111, 1)',
                    borderWidth: 1,
                },
            ],
        }

        setChartData(data);

    }, [props]);

    return (
        <Card>
            <Radar data={chartData}/>
        </Card>
    )
}