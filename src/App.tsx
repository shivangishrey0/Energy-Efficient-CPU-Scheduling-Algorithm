import React, { useState, useEffect } from 'react';
import ProcessForm from './components/ProcessForm';
import GanttChart from './components/GanttChart';
import Metrics from './components/Metrics';
import EnergyGraph from './components/EnergyGraph';
import { Process, ScheduleResult } from './types';
import { scheduleProcesses } from './utils/scheduler';

function App() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [scheduleResult, setScheduleResult] = useState<ScheduleResult | null>(null);

  useEffect(() => {
    if (processes.length > 0) {
      const result = scheduleProcesses(processes);
      setScheduleResult(result);
    } else {
      setScheduleResult(null);
    }
  }, [processes]);

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-blue p-8">
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
          onSubmit={(newProcesses: Process[]) => setProcesses(newProcesses)} 
        />
        <div className="space-y-8">
          <GanttChart scheduleResult={scheduleResult} />
          <EnergyGraph scheduleResult={scheduleResult} />
        </div>
      </div>

      <Metrics scheduleResult={scheduleResult} />
    </div>
  );
}

export default App; 