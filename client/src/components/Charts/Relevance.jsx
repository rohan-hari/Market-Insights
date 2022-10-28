import React, { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';

export default function Relevance({ insightData }) {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState([]);

  let relevanceMap = {};
  if (insightData) {
    for (let i of insightData) {
      if (i.relevance == null) continue;
      relevanceMap[i.relevance] = (relevanceMap[i.relevance] || 0) + 1;
    }
  }

  let keys = Object.keys(relevanceMap),
    values = Object.values(relevanceMap);

  useEffect(() => {
    setChartData({
      labels: [1, 2, 3, 4, 5, 6, 7],
      datasets: [
        {
          data: values,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    });
    setChartOptions({
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
          // position: 'right',
        },
      },
    });
  }, [insightData]);
  if (keys.length) return <Bar options={chartOptions} data={chartData} />;
  return <div>No data to show</div>;
}
