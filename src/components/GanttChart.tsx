import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
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

interface GanttChartProps {
  scheduleResult: ScheduleResult | null;
}

const GanttChart: React.FC<GanttChartProps> = ({ scheduleResult }) => {
  if (!scheduleResult) return null;

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'CPU Schedule Gantt Chart',
        color: '#05d9e8',
      },
    },
  };

  const data = {
    labels: scheduleResult.timeline.map(t => t.process.name),
    datasets: [
      {
        label: 'Process Timeline',
        data: scheduleResult.timeline.map(t => t.endTime - t.startTime),
        backgroundColor: '#ff2a6d',
        borderColor: '#05d9e8',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default GanttChart; 