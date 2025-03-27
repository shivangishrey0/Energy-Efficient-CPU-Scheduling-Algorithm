// src/components/Metrics.tsx
import React from 'react';
import { ScheduleResult } from '../types';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsProps {
  scheduleResult: ScheduleResult | null;
  energyHistory: {
    ideal: number[];
    optimized: number[];
    timestamps: string[];
  };
}

const Metrics: React.FC<MetricsProps> = ({ scheduleResult, energyHistory }) => {
  if (!scheduleResult) return null;

  const energyData = {
    labels: ['Ideal Energy', 'Optimized Energy'],
    datasets: [
      {
        label: 'Energy Consumption (Watts)',
        data: [scheduleResult.idealEnergyConsumption, scheduleResult.optimizedEnergyConsumption],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(53, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const cumulativeEnergyData = {
    labels: energyHistory.timestamps,
    datasets: [
      {
        label: 'Ideal Energy Consumption',
        data: energyHistory.ideal,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        fill: true,
      },
      {
        label: 'Optimized Energy Consumption',
        data: energyHistory.optimized,
        borderColor: 'rgba(53, 162, 235, 1)',
        backgroundColor: 'rgba(53, 162, 235, 0.1)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Energy Consumption Comparison',
        color: '#00ff9f',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 255, 159, 0.1)',
        },
        ticks: {
          color: '#00ff9f',
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 255, 159, 0.1)',
        },
        ticks: {
          color: '#00ff9f',
        }
      }
    }
  };

  return (
    <div className="bg-cyber-black/50 p-6 rounded-lg border border-cyber-purple shadow-neon">
      <h2 className="text-cyber-pink text-2xl font-bold mb-6">Performance Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-cyber-black/30 p-4 rounded-lg border border-cyber-blue">
          <h3 className="text-cyber-blue text-lg mb-2">Waiting Time</h3>
          <p className="text-cyber-green">
            Ideal: {scheduleResult.idealMetrics.waitingTime.toFixed(2)}ms
          </p>
          <p className="text-cyber-green">
            Optimized: {scheduleResult.optimizedMetrics.waitingTime.toFixed(2)}ms
          </p>
        </div>
        <div className="bg-cyber-black/30 p-4 rounded-lg border border-cyber-blue">
          <h3 className="text-cyber-blue text-lg mb-2">Turnaround Time</h3>
          <p className="text-cyber-green">
            Ideal: {scheduleResult.idealMetrics.turnaroundTime.toFixed(2)}ms
          </p>
          <p className="text-cyber-green">
            Optimized: {scheduleResult.optimizedMetrics.turnaroundTime.toFixed(2)}ms
          </p>
        </div>
        <div className="bg-cyber-black/30 p-4 rounded-lg border border-cyber-blue">
          <h3 className="text-cyber-blue text-lg mb-2">Response Time</h3>
          <p className="text-cyber-green">
            Ideal: {scheduleResult.idealMetrics.responseTime.toFixed(2)}ms
          </p>
          <p className="text-cyber-green">
            Optimized: {scheduleResult.optimizedMetrics.responseTime.toFixed(2)}ms
          </p>
        </div>
      </div>
      
      {/* Energy Savings */}
      <div className="mt-6 bg-cyber-black/30 p-4 rounded-lg border border-cyber-blue">
        <h3 className="text-cyber-blue text-lg mb-2">Energy Savings</h3>
        <p className="text-cyber-green text-xl">
          {scheduleResult.energySavingsPercentage.toFixed(2)}% reduction in energy consumption
        </p>
      </div>

      {/* Current Energy Consumption Graph */}
      <div className="mt-6 bg-cyber-black/30 p-4 rounded-lg border border-cyber-blue">
        <h3 className="text-cyber-blue text-lg mb-2">Current Run Energy Consumption</h3>
        <Bar data={energyData} options={options} />
      </div>

      {/* Cumulative Energy Consumption Graph */}
      <div className="mt-6 bg-cyber-black/30 p-4 rounded-lg border border-cyber-blue">
        <h3 className="text-cyber-blue text-lg mb-2">Cumulative Energy Consumption History</h3>
        <Line 
          data={cumulativeEnergyData} 
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              title: {
                ...options.plugins.title,
                text: 'Energy Consumption History'
              }
            }
          }} 
        />
      </div>
    </div>
  );
};

export default Metrics;