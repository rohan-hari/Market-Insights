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
import { convertKeyValueToObject } from '../../utils/helpers';
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

export default function Index({ checkedValue }) {
  const [insightData, setInsightData] = useState([]);
  let arr = [];
  arr.push(convertKeyValueToObject(checkedValue));

  const keyPair = arr[0];

  useEffect(() => {
    const getData = async () => {
      try {
        const reports = await axios({
          url: 'http://localhost:3001/api/reports',
          method: 'get',
          params: keyPair,
        });
        setInsightData(reports.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [checkedValue]);

  const charts = [
    { component: Year, title: 'Year', width: 'wFull' },
    { component: Relevance, title: 'Relevance', width: 'wHalf' },
    { component: Topic, title: 'Topic', width: 'wHalf' },
    { component: Intensity, title: 'Intensity', width: 'wFull' },
    { component: Region, title: 'Region', width: 'wHalf' },
    { component: Likelihood, title: 'Likelihood', width: 'wHalf' },
    { component: Country, title: 'Country', width: 'wFull' },
  ];

  return (
    <div className="main-section">
      <div className="chart-container">
        {charts.map((chart, id) => (
          <div key={id} className={`chart-box-${chart.width}`}>
            <div className="chart-title">{chart.title}</div>
            <chart.component insightData={insightData} />
          </div>
        ))}
      </div>
    </div>
  );
}
