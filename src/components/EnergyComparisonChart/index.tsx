import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EnergyComparisonChartProps {
  labels: string[];
  idealValues: number[];
  optimizedValues: number[];
}

const EnergyComparisonChart: React.FC<EnergyComparisonChartProps> = ({
  labels,
  idealValues,
  optimizedValues,
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Energy Consumption Comparison',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Energy (Watts)',
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Ideal Energy',
        data: idealValues,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Optimized Energy',
        data: optimizedValues,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="chart-container">
      <Bar options={options} data={data} />
    </div>
  );
};

export default EnergyComparisonChart;
