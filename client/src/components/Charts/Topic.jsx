import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

// import { Doughnut } from 'react-chartjs-2';

export default function Topic({ insightData }) {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState([]);

  let topicMap = {};
  if (insightData) {
    for (let i of insightData) {
      if (i.topic === '') continue;
      topicMap[i.topic] = (topicMap[i.topic] || 0) + 1;
    }
    for (let j of Object.keys(topicMap)) {
      if (!(Math.floor((topicMap[j] / insightData.length) * 100) >= 2)) {
        topicMap['others'] = (topicMap['others'] || 0) + topicMap[j];
        delete topicMap[j];
      }
    }
  }

  let keys = Object.keys(topicMap),
    values = Object.values(topicMap);

  useEffect(() => {
    setChartData({
      labels: keys,
      datasets: [
        {
          // label: 'Topic',
          data: values,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235,1)',
            'rgba(153, 102, 255, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235,1)',
            'rgba(153, 102, 255, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
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
          position: 'right',
        },
      },
    });
  }, [insightData]);
  if (keys.length) return <Doughnut options={chartOptions} data={chartData} />;
  return <div>No data to show</div>;
}
