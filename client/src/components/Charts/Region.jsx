import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

export default function Region({ insightData }) {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState([]);

  let regionMap = {};
  if (insightData) {
    for (let i of insightData) {
      if (i.region === '') continue;
      regionMap[i.region] = (regionMap[i.region] || 0) + 1;
    }
    for (let j of Object.keys(regionMap)) {
      if (!(Math.floor((regionMap[j] / insightData.length) * 100) >= 2)) {
        regionMap['Others'] = (regionMap['Others'] || 0) + regionMap[j];
        delete regionMap[j];
      }
      if (j === 'World') {
        regionMap['Others'] = (regionMap['Others'] || 0) + regionMap[j];
        delete regionMap[j];
      }
    }
  }

  let keys = Object.keys(regionMap),
    values = Object.values(regionMap);

  useEffect(() => {
    setChartData({
      labels: keys,
      datasets: [
        {
          // label: 'region',
          data: values,
          borderColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235,1)',
            'rgba(153, 102, 255, 1)',
          ],
          backgroundColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235,1)',
            'rgba(255, 206, 86, 1)',
          ],
        },
      ],
    });
    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'left',
        },
      },
    });
  }, [insightData]);
  if (keys.length) return <Pie data={chartData} options={chartOptions} />;
  return <div>No data to show</div>;
}
