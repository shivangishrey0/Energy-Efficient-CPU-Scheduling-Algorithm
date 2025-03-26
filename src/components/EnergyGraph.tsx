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
import { ScheduleResult } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
        text: 'Process Energy Consumption',
        color: '#05d9e8',
      },
    },
    scales: {
      y: {
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
          text: 'Process',
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
    labels: scheduleResult.timeline.map(t => t.process.name),
    datasets: [
      {
        label: 'Energy Consumption',
        data: scheduleResult.timeline.map(t => t.process.energyConsumption * t.process.burstTime),
        backgroundColor: '#ff2a6d',
        borderColor: '#05d9e8',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="bg-cyber-black/50 p-6 rounded-lg border border-cyber-purple shadow-neon">
      <Bar options={options} data={data} />
    </div>
  );
};

export default EnergyGraph; 