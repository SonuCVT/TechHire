import React from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const AnalyticsChart = () => {
  const darkMode = useSelector((state) => state.hrTheme.darkMode);

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Recruitments",
        data: [30, 20, 50, 60, 70, 90, 100, 80, 60, 50, 40, 30],
        fill: false,
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "rgba(34, 197, 94, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className={`shadow-md rounded-lg p-4 mb-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2
        className={`text-xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Recruitment Analytics
      </h2>
      <div className="w-full h-96">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AnalyticsChart;
