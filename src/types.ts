export interface Process {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  priority: number;
  energyConsumption: number;
}

export interface TimelineEntry {
  process: Process;
  startTime: number;
  endTime: number;
}

export interface ScheduleResult {
  timeline: TimelineEntry[];
  averageWaitingTime: number;
  averageTurnaroundTime: number;
  powerConsumption: number;
  totalEnergyConsumption: number;
} 