import React, { useState } from 'react';
import { Process, SchedulingConfig } from '../types';

interface ProcessFormProps {
  onSubmit: (processes: Process[]) => void;
  onConfigChange: (config: SchedulingConfig) => void;
}

const ProcessForm: React.FC<ProcessFormProps> = ({ onSubmit, onConfigChange }) => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [newProcess, setNewProcess] = useState<Process>({
    id: '',
    name: '',
    arrivalTime: 0,
    burstTime: 0,
    priority: 'low'
  });
  const [config, setConfig] = useState<SchedulingConfig>({
    algorithm: 'RR',
    initialTimeQuantum: 4
  });

  const handleAddProcess = (e: React.FormEvent) => {
    e.preventDefault();
    const process = {
      ...newProcess,
      id: Date.now().toString(),
      priority: newProcess.priority
    };
    setProcesses([...processes, process]);
    setNewProcess({
      id: '',
      name: '',
      arrivalTime: 0,
      burstTime: 0,
      priority: 'low'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(processes);
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const newConfig = {
      ...config,
      [e.target.name]: e.target.name === 'algorithm' ? e.target.value : Number(e.target.value)
    };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className="bg-cyber-black/50 p-6 rounded-lg border border-cyber-purple shadow-neon">
      <h2 className="text-2xl font-bold text-cyber-pink mb-6">Process Input</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-bold text-cyber-green mb-4">Scheduling Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-cyber-green mb-2">Algorithm</label>
            <select
              name="algorithm"
              value={config.algorithm}
              onChange={handleConfigChange}
              className="w-full bg-cyber-black border border-cyber-blue rounded px-4 py-2 text-cyber-blue focus:outline-none focus:border-cyber-pink"
            >
              <option value="RR">Round Robin</option>
              <option value="FCFS">First Come First Serve</option>
              <option value="SJF">Shortest Job First</option>
            </select>
          </div>
          
          {config.algorithm === 'RR' && (
            <div>
              <label className="block text-cyber-green mb-2">Time Quantum</label>
              <input
                type="number"
                name="initialTimeQuantum"
                value={config.initialTimeQuantum}
                onChange={handleConfigChange}
                min="1"
                className="w-full bg-cyber-black border border-cyber-blue rounded px-4 py-2 text-cyber-blue focus:outline-none focus:border-cyber-pink"
              />
            </div>
          )}
        </div>
      </div>

      <div className="process-input">
        <h3 className="text-xl font-bold text-cyber-green mb-4">Add Process</h3>
        <form onSubmit={handleAddProcess} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Process Name"
            value={newProcess.name}
            onChange={(e) => setNewProcess({ ...newProcess, name: e.target.value })}
            required
            className="w-full bg-cyber-black border border-cyber-blue rounded px-4 py-2 text-cyber-blue focus:outline-none focus:border-cyber-pink"
          />
          <input
            type="number"
            placeholder="Arrival Time"
            value={newProcess.arrivalTime}
            onChange={(e) => setNewProcess({ ...newProcess, arrivalTime: Number(e.target.value) })}
            min="0"
            required
            className="w-full bg-cyber-black border border-cyber-blue rounded px-4 py-2 text-cyber-blue focus:outline-none focus:border-cyber-pink"
          />
          <input
            type="number"
            placeholder="Burst Time"
            value={newProcess.burstTime}
            onChange={(e) => setNewProcess({ ...newProcess, burstTime: Number(e.target.value) })}
            min="1"
            required
            className="w-full bg-cyber-black border border-cyber-blue rounded px-4 py-2 text-cyber-blue focus:outline-none focus:border-cyber-pink"
          />
          <select
            name="priority"
            value={newProcess.priority}
            onChange={(e) => setNewProcess({ ...newProcess, priority: e.target.value as 'high' | 'low' })}
            className="w-full bg-cyber-black border border-cyber-blue rounded px-4 py-2 text-cyber-blue focus:outline-none focus:border-cyber-pink"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            type="submit"
            className="w-full bg-cyber-purple hover:bg-cyber-pink text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Add Process
          </button>
        </form>
      </div>

      {processes.length > 0 && (
        <div className="process-list">
          <h3 className="text-xl font-bold text-cyber-green mb-4">Process List</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Arrival Time</th>
                <th>Burst Time</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process) => (
                <tr key={process.id}>
                  <td>{process.name}</td>
                  <td>{process.arrivalTime}</td>
                  <td>{process.burstTime}</td>
                  <td>{process.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleSubmit}
            className="w-full bg-cyber-purple hover:bg-cyber-pink text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Schedule Processes
          </button>
        </div>
      )}
    </div>
  );
};

export default ProcessForm;