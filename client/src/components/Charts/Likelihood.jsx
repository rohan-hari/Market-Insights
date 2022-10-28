import React, { useEffect, useState } from 'react';

import { Radar } from 'react-chartjs-2';

export default function Likelihood({ insightData }) {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState([]);

  let likelihoodMap = {};
  if (insightData) {
    for (let i of insightData) {
      if (i.likelihood === null) continue;
      likelihoodMap[i.likelihood] = (likelihoodMap[i.likelihood] || 0) + 1;
    }
  }

  let keys = ['Unlikely', 'Neutral', 'Likely', 'Very Likely'],
    values = Object.values(likelihoodMap);

  useEffect(() => {
    setChartData({
      labels: keys,
      datasets: [
        {
          // label: 'likelihood',
          data: values,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: ['rgba(255, 99, 132, 1)'],
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
    });
  }, [insightData]);
  if (values.length) return <Radar options={chartOptions} data={chartData} />;
  return <div>No data to show</div>;
}
