import React, { useState } from 'react';
import { Process, SchedulingConfig, ScheduleResult } from './types';
import ProcessForm from './components/ProcessForm';
import Metrics from './components/Metrics';
import { scheduleProcesses } from './utils/scheduler';
import EnergyComparisonChart from './components/EnergyComparisonChart/index';
import './App.css';

function App() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [schedulingConfig, setSchedulingConfig] = useState<SchedulingConfig>({
    algorithm: 'RR',
    initialTimeQuantum: 4
  });
  const [scheduleResult, setScheduleResult] = useState<ScheduleResult | null>(null);
  const [energyHistory, setEnergyHistory] = useState<{
    ideal: number[];
    optimized: number[];
    timestamps: string[];
  }>({
    ideal: [],
    optimized: [],
    timestamps: []
  });

  const handleProcessSubmit = (newProcesses: Process[]) => {
    setProcesses(newProcesses);
    const result = scheduleProcesses(newProcesses, schedulingConfig);
    setScheduleResult(result);
    
    // Update energy history
    setEnergyHistory(prev => ({
      ideal: [...prev.ideal, result.idealEnergyConsumption],
      optimized: [...prev.optimized, result.optimizedEnergyConsumption],
      timestamps: [...prev.timestamps, new Date().toLocaleTimeString()]
    }));
  };

  const handleConfigChange = (config: SchedulingConfig) => {
    setSchedulingConfig(config);
    if (processes.length > 0) {
      const result = scheduleProcesses(processes, config);
      setScheduleResult(result);
      
      // Update energy history
      setEnergyHistory(prev => ({
        ideal: [...prev.ideal, result.idealEnergyConsumption],
        optimized: [...prev.optimized, result.optimizedEnergyConsumption],
        timestamps: [...prev.timestamps, new Date().toLocaleTimeString()]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-green p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-cyber-pink mb-4 animate-pulse">
          Energy-Efficient CPU Scheduler
        </h1>
        <p className="text-cyber-green text-xl">
          Optimize Your Process Management
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProcessForm 
          onSubmit={handleProcessSubmit} 
          onConfigChange={handleConfigChange} 
        />
        <div className="space-y-8">
          {scheduleResult && (
            <div className="results">
              <h2>Results</h2>
              <div className="metrics-comparison">
                <div className="metrics-section">
                  <h3>Ideal Metrics (Without Context Switch)</h3>
                  <div className="metrics">
                    <p>Average Waiting Time: {scheduleResult.idealMetrics.waitingTime.toFixed(2)} ms</p>
                    <p>Average Turnaround Time: {scheduleResult.idealMetrics.turnaroundTime.toFixed(2)} ms</p>
                    <p>Average Response Time: {scheduleResult.idealMetrics.responseTime.toFixed(2)} ms</p>
                    <p>Energy Consumption: {scheduleResult.idealEnergyConsumption} J</p>
                  </div>
                </div>
                
                <div className="metrics-section">
                  <h3>Optimized Metrics (With Context Switch)</h3>
                  <div className="metrics">
                    <p>Average Waiting Time: {scheduleResult.optimizedMetrics.waitingTime.toFixed(2)} ms</p>
                    <p>Average Turnaround Time: {scheduleResult.optimizedMetrics.turnaroundTime.toFixed(2)} ms</p>
                    <p>Average Response Time: {scheduleResult.optimizedMetrics.responseTime.toFixed(2)} ms</p>
                    <p>Energy Consumption: {scheduleResult.optimizedEnergyConsumption} J</p>
                    <p>Energy Savings: {scheduleResult.energySavingsPercentage.toFixed(2)}%</p>
                  </div>
                </div>
              </div>
              
              <div className="energy-comparison">
                <h3>Energy Consumption Comparison</h3>
                <EnergyComparisonChart
                  labels={scheduleResult.energyComparison.labels}
                  idealValues={scheduleResult.energyComparison.idealValues}
                  optimizedValues={scheduleResult.energyComparison.optimizedValues}
                />
              </div>

              <div className="timeline">
                <h3>Execution Timeline</h3>
                <div className="timeline-chart">
                  {scheduleResult.timeline.map((entry: any, index: number) => (
                    <div
                      key={index}
                      className="timeline-entry"
                      style={{
                        left: `${(entry.startTime / scheduleResult.timeline[scheduleResult.timeline.length - 1].endTime) * 100}%`,
                        width: `${((entry.endTime - entry.startTime) / scheduleResult.timeline[scheduleResult.timeline.length - 1].endTime) * 100}%`
                      }}
                    >
                      <span>{entry.process.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Metrics scheduleResult={scheduleResult} energyHistory={energyHistory} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;