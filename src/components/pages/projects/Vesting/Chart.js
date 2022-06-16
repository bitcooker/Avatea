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
  primary: '#635bff',
  black: '#000000',
};


const options = {
  responsive: true,
  interaction: {
    intersect: false,
    axis: 'x'
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        padding: 25,
      }
    }],
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
    let start = props.start
    let cliff = props.cliff
    let duration = props.duration
    let slicePeriodSeconds = props.slicePeriodSeconds
    let amountVested = props.amountVested
    let ticker = props.ticker

    let newOptions = options

    newOptions["scales"]["y"]["ticks"] = ({
      callback: function (value, index, ticks) {
        return value + ' ' + ticker;
      }
    })

    setChartOptions(newOptions)


    function vesting(currentTime) {
      if (currentTime < cliff) return 0
      else if (currentTime >= start + duration) {
        return amountVested
      } else {
        let timeFromStart = currentTime - start;
        let vestedSlicePeriods = timeFromStart / slicePeriodSeconds;
        let vestedSeconds = vestedSlicePeriods * slicePeriodSeconds;
        return amountVested * vestedSeconds / duration;
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

    while (time < start + duration + slicePeriodSeconds) {

      data_points.push({
        "timestamp": time,
        "labels": timeConverter(time),
        "values": vesting(time),
        "colors": CHART_COLORS.primary,
        "pointRadius": 3

      })

      time += slicePeriodSeconds
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
          stepped: true,
          pointBackgroundColor: colors,
          pointRadius: pointRadius

        }
      ]
    };

    setChartData(newData)

  }, [props]);

  return <Line options={chartOptions} data={chartData}/>;
}