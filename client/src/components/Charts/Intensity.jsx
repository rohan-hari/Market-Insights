import React, { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';

export default function Intensity({ insightData }) {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState([]);

  let intensityMap = {};
  if (insightData) {
    for (let i of insightData) {
      if (i.intensity === null) continue;
      intensityMap[i.intensity] = (intensityMap[i.intensity] || 0) + 1;
    }
  }

  let keys = Object.keys(intensityMap),
    values = Object.values(intensityMap);

  useEffect(() => {
    setChartData({
      labels: keys,
      datasets: [
        {
          // label: 'intensity',
          data: values,
          borderColor: 'rgba(255, 159, 64, 0.7)',
          backgroundColor: 'rgba(255, 159, 64, 0.7)',
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
          max: values.length > 7 ? 120 : null,
          grid: {
            display: false,
          },
        },
      },
    });
  }, [insightData]);
  if (keys.length) return <Bar data={chartData} options={chartOptions} />;
  return <div>No data to show</div>;
}
