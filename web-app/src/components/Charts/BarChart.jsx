import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Oval, Puff } from 'react-loader-spinner';

const BarChart = (prop) => {
  const chartRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let chartInstance;

    const dd = prop.crop
    console.log(dd)

    const fetchData = async () => {
      setVisible(true);

      try {
        const response = await fetch("http://ip172-18-0-28-cib40imfml8g00a62nm0-8080.direct.labs.play-with-docker.com/predictions/crop_yield?crop="+dd.crop, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const prediction = await response.json();
        console.log(prediction);

        setVisible(false);

        if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');

          chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Autumn', 'Kharif', 'Rabi', 'Summer', 'Whole Year'],
              datasets: [
                {
                  label: "Production (ton/hec)",
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderWidth: 1,
                  data: [prediction.Autumn, prediction.Kharif, prediction.Rabi, prediction.Summer, prediction["Whole Year"]],
                },
              ],
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Seasonal Forecasting of ' + dd.crop,
                  font: {
                    size: 18,
                    weight: 'bold',
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      // Destroy the chart instance when the component unmounts
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <>
      {visible ? (
        <div className="flex justify-center items-center h-[470px]">
          <Puff
            color="rgba(75,192,192)"
            visible={loading}
            ariaLabel="puff-loading"
            style={{ width: '100px', height: '100px' }}
          />
        </div>
      ) : (
        <div style={{ width: '900px', height: '470px' }}>
          <canvas ref={chartRef} />
        </div>
      )}
    </>
  );
};

export default BarChart;

