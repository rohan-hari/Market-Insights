import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LineController,
  RadialLinearScale,
  ArcElement,
  PointElement,
  LinearScale,
  BarElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// prettier-ignore
import { Year, Intensity, Topic, Relevance, Region, Likelihood, Country } from './export';
import axios from 'axios';
import './styles.css';

ChartJS.register(
  RadialLinearScale,
  LineController,
  CategoryScale,
  LinearScale,
  ArcElement,
  TimeScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Index() {
  const [insightData, setInsightData] = useState([]);
  const [chartOptions, setChartOptions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const reports = await axios.get(`http://localhost:3001/api/reports`);
        setInsightData(reports.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    setChartOptions({
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.yLabel;
          },
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
  }, []);

  return (
    <div className="main-section">
      {/* prettier-ignore */}
      <div className="chart-container">
        <div className="chart-box-wFull"><Year insightData={insightData} chartOptions={chartOptions} /></div>
        <div className="chart-box-wHalf"><Relevance insightData={insightData} /></div>
        <div className="chart-box-wHalf"><Topic insightData={insightData} /></div>
        <div className="chart-box-wFull"><Intensity insightData={insightData} /></div>
        <div className="chart-box-wHalf"><Likelihood insightData={insightData} /></div>
        <div className="chart-box-wHalf"><Region insightData={insightData} /></div>
        <div className="chart-box-wFull"><Country insightData={insightData} /></div>
      </div>
    </div>
  );
}
