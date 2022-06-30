import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function ChartLine({ labels, datasets }) {
  const chart = useRef(null);
  const [gradient, setGradient] = useState(null);
  const [gradientBorder, setgradientBorder] = useState(null);

  useEffect(() => {
    var canvas = document.querySelector("canvas");
    if (canvas) {
      var ctx = canvas.getContext("2d");
      let newGradient = ctx.createLinearGradient(0, 0, 0, 400);
      let newgradientBorder = ctx.createLinearGradient(0, 0, 0, 400);
      newGradient.addColorStop(0, "rgba(107, 73, 211, 0.1)");
      newGradient.addColorStop(1, "rgba(107, 73, 211, 0)");
      newgradientBorder.addColorStop(0, "#6B49D3");
      newgradientBorder.addColorStop(0.5, "#F161B6");
      newgradientBorder.addColorStop(1, "#F95249");
      setGradient(newGradient);
      setgradientBorder(newgradientBorder);
    }
  }, []);

  const options = {
    type: "line",
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      // xAxis: {
      //   grid: {
      //     display: false,
      //   },
      // },
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [8],
          borderColor: "transparent",
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            return value + "K";
          },
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        pointStyle: "circle",
        pointRadius: 0,
        data: datasets,
        borderColor: gradientBorder,
        fill: true,
        backgroundColor: gradient,
      },
    ],
  };
  return <Line options={options} data={data} ref={chart} />;
}
