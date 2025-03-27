import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ScheduleResult } from '../types';

const BASE_POWER_CONSUMPTION = 1; // Define the base power consumption

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface EnergyGraphProps {
  scheduleResult: ScheduleResult | null;
}

const EnergyGraph: React.FC<EnergyGraphProps> = ({ scheduleResult }) => {
  if (!scheduleResult) return null;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#05d9e8'
        }
      },
      title: {
        display: true,
        text: 'Energy Consumption Over Time',
        color: '#05d9e8',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Energy (Watts)',
          color: '#05d9e8'
        },
        grid: {
          color: '#05d9e833'
        },
        ticks: {
          color: '#05d9e8'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time',
          color: '#05d9e8'
        },
        grid: {
          color: '#05d9e833'
        },
        ticks: {
          color: '#05d9e8'
        }
      }
    }
  };

  const data = {
    labels: scheduleResult.timeline.map((_, index) => `T${index}`),
    datasets: [
      {
        label: 'Ideal Energy',
        data: scheduleResult.timeline.map(t => 
          BASE_POWER_CONSUMPTION * (t.endTime - t.startTime)
        ),
        backgroundColor: '#ff2a6d',
        borderColor: '#05d9e8',
        borderWidth: 1,
      },
      {
        label: 'Optimized Energy',
        data: scheduleResult.timeline.map(t => 
          t.powerConsumption
        ),
        backgroundColor: '#4a90e2',
        borderColor: '#2ecc71',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="bg-cyber-black/50 p-6 rounded-lg border border-cyber-purple shadow-neon">
      <Line options={options} data={data} />
    </div>
  );
};

export default EnergyGraph;