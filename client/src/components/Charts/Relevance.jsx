import React, { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';

export default function Relevance({ insightData }) {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOption, setChartOption] = useState([]);

  let relevanceMap = {};
  if (insightData) {
    for (let i of insightData) {
      if (i.relevance == null) continue;
      relevanceMap[i.relevance] = (relevanceMap[i.relevance] || 0) + 1;
    }
  }

  console.log(relevanceMap);
  let keys = Object.keys(relevanceMap),
    values = Object.values(relevanceMap);

  useEffect(() => {
    setChartData({
      labels: keys,
      datasets: [
        {
          data: values,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 1)',
        },
      ],
    });
    setChartOption({
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
          position: 'right',
        },
      },
    });
  }, [insightData]);
  return <Bar options={chartOption} data={chartData} />;
}
