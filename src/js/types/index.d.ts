// Actions
export interface BaseAction {
  type: string;
}

export interface ParameterAction extends BaseAction {
  value: number;
}

// State
interface simulationState {
  initialized: boolean;
  running: boolean;
}

export interface ParameterState {
  startTheta: number;
  startOmega: number;
  damping: number;
}

export interface StoreState {
  simulation: simulationState;
  parameters: ParameterState;
}