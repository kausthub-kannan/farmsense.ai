import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { crop_model_predict } from '../../data_portal';
import { Puff } from 'react-loader-spinner';

const MultiLineChart = (prop) => {
  const chartRef = useRef(null);
  const [crop, setCrop] = useState({});

  useEffect(() => {
    let chartInstance = null;

    const fetchData = async () => {
      const response = prop.data;
      console.log(response)

      const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Rainfall',
            data: response.rainfall,
            backgroundColor: 'rgba(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132)',
            fill: false,
          },
          {
            label: 'Temperature',
            data: response.temperature,
            backgroundColor: 'rgba(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192)',
            fill: false,
          },
          {
            label: 'Humidity',
            data: response.humidity,
            backgroundColor: 'rgba(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192)',
            fill: false,
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: response.crop,
            font: {
              size: 18,
              weight: 'bold',
            },
          },
        },
      };

      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }

      if (chartRef.current) {
        chartInstance = new Chart(chartRef.current.getContext('2d'), {
          type: 'line',
          data: data,
          options: options,
        });
      }
    };

    fetchData();
  }, []);

 

  return (
    <div style={{ width: '900px', height: '470px' }}>
        <canvas ref={chartRef} />
    </div>
  );
};

export default MultiLineChart;







