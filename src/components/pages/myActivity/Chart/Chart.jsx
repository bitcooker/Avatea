import React, { useState } from "react";
import { ChartLine } from "./ChartLine";

export const chartModal = {
  "1m": {
    labels: [
      "Jan",
      "Feb",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [0, 12, 25, 5, 34, 22, 21, 32, 24, 35, 25, 22],
  },
  "3m": {
    labels: [
      "10min",
      "20min",
      "30min",
      "40min",
      "50min",
      "60min",
      "10min",
      "20min",
      "30min",
      "40min",
      "50min",
    ],
    datasets: [1, 1.2, 1.4, 1.6, 2, 1, 1.5, 2, 1, 1.5, 2],
  },
  "6m": {
    labels: [
      "Jan",
      "Feb",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [0, 12, 25, 5, 34, 22, 21, 32, 24, 35, 25, 22],
  },
  "1y": {
    labels: [
      "10min",
      "20min",
      "30min",
      "40min",
      "50min",
      "60min",
      "10min",
      "20min",
      "30min",
      "40min",
      "50min",
    ],
    datasets: [1, 1.2, 1.4, 1.6, 2, 1, 1.5, 2, 1, 1.5, 2],
  },
  all: {
    labels: [
      "Jan",
      "Feb",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [0, 12, 25, 5, 34, 22, 21, 32, 24, 35, 25, 22],
  },
};

export default function Chart() {
  const [period, setPeriod] = useState("1m");

  return (
    <div className="chart">
      <div className="chart__header">
        <h2>Overall USD Value</h2>
        <div className="chart__header-nav">
          <button
            onClick={() => setPeriod("1m")}
            className={period === "1m" ? "active" : ""}
          >
            1m
          </button>
          <button
            onClick={() => setPeriod("3m")}
            className={period === "3m" ? "active" : ""}
          >
            3m
          </button>
          <button
            onClick={() => setPeriod("6m")}
            className={period === "6m" ? "active" : ""}
          >
            6m
          </button>
          <button
            onClick={() => setPeriod("1y")}
            className={period === "1y" ? "active" : ""}
          >
            1y
          </button>
          <button
            onClick={() => setPeriod("all")}
            className={period === "all" ? "active" : ""}
          >
            all
          </button>
        </div>
      </div>
      <div className="chart__body">
        <ChartLine
          datasets={chartModal[period].datasets}
          labels={chartModal[period].labels}
        />
      </div>
    </div>
  );
}
