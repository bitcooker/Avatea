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
    <div className="md-lg:col-span-2 bg-white rounded-2.5xl p-5">
      <div className="flex items-center justify-between mb-16">
        <h2 className="text-2xl">Overall USD Value</h2>
        <div className="flex border-b-2 border-indigo-500/10">
          <button
            onClick={() => setPeriod("1m")}
            className={`relative bg-none font-medium text-base tracking-[.0125em] text-[#00204c]/70 mx-2.5 hover:cursor-pointer ${period === "1m" ? "text-black after:w-full after:absolute after:content-[''] after:-bottom-0.5 after:left-0 after:h-0.75 after:rounded-[5px] after:bg-indigo-500" : ""}`}
          >
            1m
          </button>
          <button
            onClick={() => setPeriod("3m")}
            className={`relative bg-none font-medium text-base tracking-[.0125em] text-[#00204c]/70 mx-2.5 hover:cursor-pointer ${period === "3m" ? "text-black after:w-full after:absolute after:content-[''] after:-bottom-0.5 after:left-0 after:h-0.75 after:rounded-[5px] after:bg-indigo-500" : ""}`}
          >
            3m
          </button>
          <button
            onClick={() => setPeriod("6m")}
            className={`relative bg-none font-medium text-base tracking-[.0125em] text-[#00204c]/70 mx-2.5 hover:cursor-pointer ${period === "6m" ? "text-black after:w-full after:absolute after:content-[''] after:-bottom-0.5 after:left-0 after:h-0.75 after:rounded-[5px] after:bg-indigo-500" : ""}`}
          >
            6m
          </button>
          <button
            onClick={() => setPeriod("1y")}
            className={`relative bg-none font-medium text-base tracking-[.0125em] text-[#00204c]/70 mx-2.5 hover:cursor-pointer ${period === "1y" ? "text-black after:w-full after:absolute after:content-[''] after:-bottom-0.5 after:left-0 after:h-0.75 after:rounded-[5px] after:bg-indigo-500" : ""}`}
          >
            1y
          </button>
          <button
            onClick={() => setPeriod("all")}
            className={`relative bg-none font-medium text-base tracking-[.0125em] text-[#00204c]/70 mx-2.5 hover:cursor-pointer ${period === "all" ? "text-black after:w-full after:absolute after:content-[''] after:-bottom-0.5 after:left-0 after:h-0.75 after:rounded-[5px] after:bg-indigo-500" : ""}`}
          >
            all
          </button>
        </div>
      </div>
      <div className="h-120">
        <ChartLine
          datasets={chartModal[period].datasets}
          labels={chartModal[period].labels}
        />
      </div>
    </div>
  );
}
