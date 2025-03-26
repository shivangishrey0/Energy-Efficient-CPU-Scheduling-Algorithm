import { Process, ScheduleResult } from '../types';

export function scheduleProcesses(processes: Process[]): ScheduleResult {
  // Sort processes by arrival time
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  
  const timeline: { process: Process; startTime: number; endTime: number }[] = [];
  let currentTime = 0;
  let totalWaitingTime = 0;
  let totalTurnaroundTime = 0;
  let totalEnergyConsumption = 0;

  // Process queue for ready processes
  const readyQueue: Process[] = [];

  while (sortedProcesses.length > 0 || readyQueue.length > 0) {
    // Add arrived processes to ready queue
    while (sortedProcesses.length > 0 && sortedProcesses[0].arrivalTime <= currentTime) {
      readyQueue.push(sortedProcesses.shift()!);
    }

    // If no processes are ready, advance time to next arrival
    if (readyQueue.length === 0 && sortedProcesses.length > 0) {
      currentTime = sortedProcesses[0].arrivalTime;
      continue;
    }

    // Select process with highest priority from ready queue
    const selectedProcess = readyQueue.reduce((prev, current) => 
      (current.priority || 0) > (prev.priority || 0) ? current : prev
    );

    // Remove selected process from ready queue
    const processIndex = readyQueue.indexOf(selectedProcess);
    readyQueue.splice(processIndex, 1);

    // Calculate waiting time
    const waitingTime = currentTime - selectedProcess.arrivalTime;
    totalWaitingTime += waitingTime;

    // Execute process
    const startTime = currentTime;
    currentTime += selectedProcess.burstTime;
    const endTime = currentTime;

    // Calculate turnaround time
    const turnaroundTime = endTime - selectedProcess.arrivalTime;
    totalTurnaroundTime += turnaroundTime;

    // Calculate energy consumption
    const energyConsumption = selectedProcess.energyConsumption * selectedProcess.burstTime;
    totalEnergyConsumption += energyConsumption;

    // Add to timeline
    timeline.push({
      process: selectedProcess,
      startTime,
      endTime,
    });
  }

  // Calculate averages
  const numProcesses = processes.length;
  const averageWaitingTime = totalWaitingTime / numProcesses;
  const averageTurnaroundTime = totalTurnaroundTime / numProcesses;

  return {
    timeline,
    averageWaitingTime,
    averageTurnaroundTime,
    powerConsumption: totalEnergyConsumption,
    totalEnergyConsumption
  };
} 