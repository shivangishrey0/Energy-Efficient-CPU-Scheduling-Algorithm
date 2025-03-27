export interface Process {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  priority: 'high' | 'low';
  remainingTime?: number;
  completionTime?: number;
  firstExecutionTime?: number;
}

export interface TimelineEntry {
  process: Process;
  startTime: number;
  endTime: number;
  powerConsumption: number;
  state: 'executing' | 'contextSwitch' | 'idle';
  duration: number;
}

export interface Metrics {
  waitingTime: number;
  turnaroundTime: number;
  responseTime: number;
}

export interface ScheduleResult {
  timeline: TimelineEntry[];
  idealMetrics: Metrics;
  optimizedMetrics: Metrics;
  idealEnergyConsumption: number;
  optimizedEnergyConsumption: number;
  energySavingsPercentage: number;
  energyComparison: {
    labels: string[];
    idealValues: number[];
    optimizedValues: number[];
  };
}

export type SchedulingAlgorithm = 'RR' | 'FCFS' | 'SJF';

export interface SchedulingConfig {
  algorithm: SchedulingAlgorithm;
  initialTimeQuantum?: number;
}