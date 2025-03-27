import { Process, ScheduleResult, TimelineEntry, SchedulingConfig, Metrics } from '../types';

// Constants for power calculations
const BASE_POWER_CONSUMPTION = 100; // Watts
const CONTEXT_SWITCH_OVERHEAD = 0.1; // Reduce to 10% overhead
const IDLE_POWER = 5; // Reduce idle power consumption
const CONTEXT_SWITCH_TIME = 0.5; // Reduce context switch time
const POWER_TRANSITION_COST = 2; // Power cost for state transitions

// Add power-aware scheduling logic
function calculateOptimizedEnergy(
  timeline: TimelineEntry[],
  totalTime: number,
  contextSwitches: number
): number {
  let totalEnergy = 0;
  let lastState = 'idle';

  timeline.forEach(entry => {
    // Calculate duration for each entry
    entry.duration = entry.endTime - entry.startTime;

    // Add power transition cost when switching states
    if (lastState !== entry.state) {
      totalEnergy += POWER_TRANSITION_COST;
    }

    if (entry.state === 'executing') {
      // Use dynamic voltage scaling
      const powerLevel = entry.process.priority === 'high' ? 1 : 0.7;
      totalEnergy += BASE_POWER_CONSUMPTION * powerLevel * entry.duration;
    } else if (entry.state === 'contextSwitch') {
      totalEnergy += BASE_POWER_CONSUMPTION * CONTEXT_SWITCH_OVERHEAD * entry.duration;
    } else {
      totalEnergy += IDLE_POWER * entry.duration;
    }

    lastState = entry.state;
  });

  return totalEnergy;
}

function optimizedRoundRobin(processes: Process[], config: SchedulingConfig): ScheduleResult {
  const timeQuantum = config.initialTimeQuantum || 4;
  const sortedProcesses = [...processes].map(p => ({ 
    ...p, 
    remainingTime: p.burstTime,
    priority: p.priority || 'low' // Default to low priority if not specified
  }));
  
  // Group processes by priority to minimize context switches
  const highPriorityProcesses = sortedProcesses.filter(p => p.priority === 'high');
  const lowPriorityProcesses = sortedProcesses.filter(p => p.priority === 'low');
  
  // Schedule high priority processes first
  const prioritizedProcesses = [...highPriorityProcesses, ...lowPriorityProcesses];
  
  const timeline: TimelineEntry[] = [];
  let currentTime = 0;
  let readyQueue = [...prioritizedProcesses];
  let completedProcesses: Process[] = [];
  let contextSwitches = 0;

  while (readyQueue.length > 0) {
    const currentProcess = readyQueue.shift()!;
    
    // Record first execution time for response time calculation
    if (currentProcess.firstExecutionTime === undefined) {
      currentProcess.firstExecutionTime = currentTime;
    }

    // Add context switch if needed
    if (timeline.length > 0) {
      timeline.push({
        process: currentProcess,
        startTime: currentTime,
        endTime: currentTime + CONTEXT_SWITCH_TIME,
        powerConsumption: BASE_POWER_CONSUMPTION * CONTEXT_SWITCH_OVERHEAD,
        state: 'contextSwitch',
        duration: CONTEXT_SWITCH_TIME
      });
      currentTime += CONTEXT_SWITCH_TIME;
      contextSwitches++;
    }

    const executionTime = Math.min(currentProcess.remainingTime!, timeQuantum);

    // Add process execution
    timeline.push({
      process: currentProcess,
      startTime: currentTime,
      endTime: currentTime + executionTime,
      powerConsumption: BASE_POWER_CONSUMPTION * (currentProcess.priority === 'high' ? 1 : 0.7),
      state: 'executing',
      duration: executionTime
    });

    currentProcess.remainingTime! -= executionTime;
    currentTime += executionTime;

    if (currentProcess.remainingTime! > 0) {
      readyQueue.push(currentProcess);
    } else {
      currentProcess.completionTime = currentTime;
      completedProcesses.push(currentProcess);
    }
  }

  // Calculate metrics
  const numProcesses = processes.length;
  const idealEnergy = calculateIdealEnergy(processes);
  const optimizedEnergy = calculateOptimizedEnergy(timeline, currentTime, contextSwitches);
  const energySavings = ((idealEnergy - optimizedEnergy) / idealEnergy) * 100;

  return {
    timeline,
    idealMetrics: calculateIdealMetrics(processes),
    optimizedMetrics: calculateOptimizedMetrics(completedProcesses),
    idealEnergyConsumption: idealEnergy,
    optimizedEnergyConsumption: optimizedEnergy,
    energySavingsPercentage: energySavings,
    energyComparison: {
      labels: timeline.map((_, i) => `T${i}`),
      idealValues: timeline.map(t => BASE_POWER_CONSUMPTION * t.duration),
      optimizedValues: timeline.map(t => t.powerConsumption * t.duration)
    }
  };
}

function calculateIdealEnergy(processes: Process[]): number {
  return processes.reduce((total, p) => total + (BASE_POWER_CONSUMPTION * p.burstTime), 0);
}

function calculateIdealMetrics(processes: Process[]): Metrics {
  let totalWaitingTime = 0;
  let totalTurnaroundTime = 0;
  let totalResponseTime = 0;
  let currentTime = 0;

  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

  sortedProcesses.forEach(process => {
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }

    const waitingTime = currentTime - process.arrivalTime;
    const responseTime = waitingTime;
    const completionTime = currentTime + process.burstTime;
    const turnaroundTime = completionTime - process.arrivalTime;

    totalWaitingTime += waitingTime;
    totalResponseTime += responseTime;
    totalTurnaroundTime += turnaroundTime;

    currentTime = completionTime;
  });

  const numProcesses = processes.length;
  return {
    waitingTime: totalWaitingTime / numProcesses,
    turnaroundTime: totalTurnaroundTime / numProcesses,
    responseTime: totalResponseTime / numProcesses
  };
}

function calculateOptimizedMetrics(processes: Process[]): Metrics {
  let totalWaitingTime = 0;
  let totalTurnaroundTime = 0;
  let totalResponseTime = 0;

  processes.forEach(process => {
    const turnaroundTime = process.completionTime! - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;
    const responseTime = process.firstExecutionTime! - process.arrivalTime;

    totalTurnaroundTime += turnaroundTime;
    totalWaitingTime += waitingTime;
    totalResponseTime += responseTime;
  });

  const numProcesses = processes.length;
  return {
    waitingTime: totalWaitingTime / numProcesses,
    turnaroundTime: totalTurnaroundTime / numProcesses,
    responseTime: totalResponseTime / numProcesses
  };
}

export function scheduleProcesses(
  processes: Process[],
  config: SchedulingConfig
): ScheduleResult {
  switch (config.algorithm) {
    case 'RR':
      return optimizedRoundRobin(processes, config);
    case 'FCFS':
      return optimizedRoundRobin(processes, { ...config, initialTimeQuantum: Number.MAX_SAFE_INTEGER });
    case 'SJF':
      return optimizedRoundRobin(
        [...processes].sort((a, b) => a.burstTime - b.burstTime),
        { ...config, initialTimeQuantum: Number.MAX_SAFE_INTEGER }
      );
    default:
      throw new Error(`Unsupported algorithm: ${config.algorithm}`);
  }
}