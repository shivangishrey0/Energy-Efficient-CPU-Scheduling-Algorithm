import React from 'react';
import { ScheduleResult } from '../types';

interface MetricsProps {
  scheduleResult: ScheduleResult | null;
}

const Metrics: React.FC<MetricsProps> = ({ scheduleResult }) => {
  if (!scheduleResult) return null;

  return (
    <div className="mt-8 bg-cyber-black/50 p-6 rounded-lg border border-cyber-purple shadow-neon">
      <h2 className="text-2xl font-bold text-cyber-pink mb-6">Performance Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-cyber-black/30 p-4 rounded-lg border border-cyber-blue">
          <h3 className="text-cyber-green text-lg mb-2">Average Waiting Time</h3>
          <p className="text-3xl font-bold text-cyber-pink">
            {scheduleResult.averageWaitingTime.toFixed(2)} ms
          </p>
        </div>

        <div className="bg-cyber-black/30 p-4 rounded-lg border border-cyber-blue">
          <h3 className="text-cyber-green text-lg mb-2">Average Turnaround Time</h3>
          <p className="text-3xl font-bold text-cyber-pink">
            {scheduleResult.averageTurnaroundTime.toFixed(2)} ms
          </p>
        </div>

        <div className="bg-cyber-black/30 p-4 rounded-lg border border-cyber-blue">
          <h3 className="text-cyber-green text-lg mb-2">Total Energy Consumption</h3>
          <p className="text-3xl font-bold text-cyber-pink">
            {scheduleResult.totalEnergyConsumption.toFixed(2)} W
          </p>
        </div>
      </div>
    </div>
  );
};

export default Metrics;