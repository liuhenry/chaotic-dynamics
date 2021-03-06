// Actions
export interface BaseAction {
  type: string;
}

export interface ParameterAction extends BaseAction {
  value: number | string;
}

// State
interface simulationState {
  initialized: boolean;
  running: boolean;
}

export interface ParameterState {
  simulationSpeed: number;
  startTheta: number;
  startOmega: number;
  damping: number;
  driveAmplitude: number;
  driveFrequency: number;
}

export interface StoreState {
  simulation: simulationState;
  parameters: ParameterState;
}