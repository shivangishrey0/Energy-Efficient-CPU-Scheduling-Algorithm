// Represents a process in the CPU scheduling algorithm with its attributes.
export interface Process {
  id: string; // Unique identifier for the process.
  name: string; // Name of the process.
  arrivalTime: number; // Time at which the process arrives in the ready queue.
  burstTime: number; // Total CPU time required by the process.
  priority: 'high' | 'low'; // Priority level of the process.
  remainingTime?: number; // Remaining CPU time for the process (optional).
  completionTime?: number; // Time at which the process completes execution (optional).
  firstExecutionTime?: number; // Time at which the process starts execution for the first time (optional).
}

// Represents an entry in the scheduling timeline.
export interface TimelineEntry {
  process: Process; // The process being executed or in a specific state.
  startTime: number; // Start time of the timeline entry.
  endTime: number; // End time of the timeline entry.
  powerConsumption: number; // Power consumed during this timeline entry.
  state: 'executing' | 'contextSwitch' | 'idle'; // State of the CPU during this timeline entry.
  duration: number; // Duration of the timeline entry.
}

// Represents the performance metrics for a scheduling algorithm.
export interface Metrics {
  waitingTime: number; // Average waiting time for all processes.
  turnaroundTime: number; // Average turnaround time for all processes.
  responseTime: number; // Average response time for all processes.
}

// Represents the result of a scheduling algorithm execution.
export interface ScheduleResult {
  timeline: TimelineEntry[]; // Timeline of the scheduling process.
  idealMetrics: Metrics; // Metrics for the ideal scheduling scenario.
  optimizedMetrics: Metrics; // Metrics for the optimized scheduling scenario.
  idealEnergyConsumption: number; // Energy consumption in the ideal scenario.
  optimizedEnergyConsumption: number; // Energy consumption in the optimized scenario.
  energySavingsPercentage: number; // Percentage of energy saved in the optimized scenario.
  energyComparison: {
    labels: string[]; // Labels for energy comparison (e.g., "Ideal", "Optimized").
    idealValues: number[]; // Energy values for the ideal scenario.
    optimizedValues: number[]; // Energy values for the optimized scenario.
  };
}

// Defines the supported scheduling algorithms.
export type SchedulingAlgorithm = 'RR' | 'FCFS' | 'SJF'; // Round Robin, First-Come-First-Serve, Shortest Job First.

// Configuration options for the scheduling algorithm.
export interface SchedulingConfig {
  algorithm: SchedulingAlgorithm; // Selected scheduling algorithm.
  initialTimeQuantum?: number; // Time quantum for Round Robin (optional).
}