import React, { useState, useEffect } from 'react';

import { Line } from 'react-chartjs-2';

export default function Year({ insightData, chartOptions }) {
  const [chartData, setChartData] = useState({ datasets: [] });

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
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 1)',
        },
      ],
    });
  }, [insightData]);

  return <Line data={chartData} options={chartOptions} />;
}
