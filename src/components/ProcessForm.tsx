import React, { useState } from 'react';
import { Process } from '../types';

interface ProcessFormProps {
  onSubmit: (processes: Process[]) => void;
}

const ProcessForm: React.FC<ProcessFormProps> = ({ onSubmit }) => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [newProcess, setNewProcess] = useState<Process>({
    id: '',
    name: '',
    arrivalTime: 0,
    burstTime: 0,
    priority: 0,
    energyConsumption: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProcesses = [...processes, { ...newProcess, id: `P${processes.length + 1}` }];
    setProcesses(updatedProcesses);
    onSubmit(updatedProcesses);
    setNewProcess({
      id: '',
      name: '',
      arrivalTime: 0,
      burstTime: 0,
      priority: 0,
      energyConsumption: 0,
    });
  };

  const handleDelete = (id: string) => {
    const updatedProcesses = processes.filter(p => p.id !== id);
    setProcesses(updatedProcesses);
    onSubmit(updatedProcesses);
  };

  return (
    <div className="bg-cyber-black/50 p-6 rounded-lg border border-cyber-purple shadow-neon">
      <h2 className="text-2xl font-bold text-cyber-pink mb-6">Process Input</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-cyber-green mb-2">Process Name</label>
          <input
            type="text"
            value={newProcess.name}
            onChange={(e) => setNewProcess({ ...newProcess, name: e.target.value })}
            className="w-full bg-cyber-black border border-cyber-blue rounded px-4 py-2 text-cyber-blue focus:outline-none focus:border-cyber-pink"
            required
          />
        </div>
        
        <div>
          <label className="block text-cyber-green mb-2">Arrival Time</label>
          <input
            type="number"
            value={newProcess.arrivalTime}
            onChange={(e) => setNewProcess({ ...newProcess, arrivalTime: Number(e.target.value) })}
            className="w-full bg-cyber-black border border-cyber-blue rounded px-4 py-2 text-cyber-blue focus:outline-none focus:border-cyber-pink"
            required
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-cyber-green mb-2">Burst Time</label>
          <input
            type="number"
            value={newProcess.burstTime}
            onChange={(e) => setNewProcess({ ...newProcess, burstTime: Number(e.target.value) })}
            className="w-full bg-cyber-black border border-cyber-blue rounded px-4 py-2 text-cyber-blue focus:outline-none focus:border-cyber-pink"
            required
            min="1"
          />
        </div>
        
        <div>
          <label className="block text-cyber-green mb-2">Priority</label>
          <input
            type="number"
            value={newProcess.priority}
            onChange={(e) => setNewProcess({ ...newProcess, priority: Number(e.target.value) })}
            className="w-full bg-cyber-black border border-cyber-blue rounded px-4 py-2 text-cyber-blue focus:outline-none focus:border-cyber-pink"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-cyber-green mb-2">Energy Consumption (watts)</label>
          <input
            type="number"
            value={newProcess.energyConsumption}
            onChange={(e) => setNewProcess({ ...newProcess, energyConsumption: Number(e.target.value) })}
            className="w-full bg-cyber-black border border-cyber-blue rounded px-4 py-2 text-cyber-blue focus:outline-none focus:border-cyber-pink"
            required
            min="0"
            step="0.1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyber-pink text-white py-2 rounded hover:bg-opacity-80 transition-all duration-300"
        >
          Add Process
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-cyber-green">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Arrival Time</th>
              <th className="px-4 py-2">Burst Time</th>
              <th className="px-4 py-2">Priority</th>
              <th className="px-4 py-2">Energy (W)</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process) => (
              <tr key={process.id} className="border-t border-cyber-blue">
                <td className="px-4 py-2 text-center">{process.id}</td>
                <td className="px-4 py-2 text-center">{process.name}</td>
                <td className="px-4 py-2 text-center">{process.arrivalTime}</td>
                <td className="px-4 py-2 text-center">{process.burstTime}</td>
                <td className="px-4 py-2 text-center">{process.priority}</td>
                <td className="px-4 py-2 text-center">{process.energyConsumption}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(process.id)}
                    className="text-cyber-pink hover:text-opacity-80"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessForm; 