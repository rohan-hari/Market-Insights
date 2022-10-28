import React, { useState, useEffect } from 'react';

import { Line } from 'react-chartjs-2';

export default function Year({ insightData }) {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState([]);

  let yearMap = {};
  if (insightData) {
    for (let i of insightData) {
      if (i.end_year === '') continue;
      yearMap[i.end_year] = (yearMap[i.end_year] || 0) + 1;
    }
  }
  // Object.keys(yearMap).forEach((value) =>
  //   yearMap[value] <= 1 ? delete yearMap[value] : value
  // );
  let keys = Object.keys(yearMap),
    values = Object.values(yearMap);

  useEffect(() => {
    setChartData({
      labels: keys,
      datasets: [
        {
          // label: 'Year',
          data: values,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 1)',
          pointRadius: 4,
        },
      ],
    });
    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
    });
  }, [insightData]);

  if (keys.length) return <Line data={chartData} options={chartOptions} />;
  return <div>No data to show</div>;
}
