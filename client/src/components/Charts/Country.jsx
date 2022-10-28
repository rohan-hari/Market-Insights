import React, { useState, useEffect } from 'react';

import { Line } from 'react-chartjs-2';

export default function Country({ insightData }) {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState([]);

  let countryMap = {};
  if (insightData) {
    for (let i of insightData) {
      if (i.country === '') continue;
      if (i.country === 'United States of America')
        countryMap['USA'] = (countryMap['USA'] || 0) + 1;
      else countryMap[i.country] = (countryMap[i.country] || 0) + 1;
    }
  }
  countryMap = Object.keys(countryMap)
    .sort()
    .reduce((obj, key) => {
      obj[key] = countryMap[key];
      return obj;
    }, {});
  Object.keys(countryMap).forEach((value) => {
    if (countryMap[value] <= 1) delete countryMap[value];
  });
  let keys = Object.keys(countryMap),
    values = Object.values(countryMap);

  useEffect(() => {
    setChartData({
      labels: keys,
      datasets: [
        {
          // label: 'country',
          data: values,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 1)',
          pointRadius: 5,
        },
      ],
    });
    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      showLine: false,
      scales: {
        y: {
          max: values.length > 7 ? 30 : null,
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
          position: 'left',
        },
      },
    });
  }, [insightData]);

  if (!keys.length) return <div>No data to show</div>;
  return <Line data={chartData} options={chartOptions} />;
}
