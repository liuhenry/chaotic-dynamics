// Actions
export interface BaseAction {
  type: string;
}

export interface ParameterAction extends BaseAction {
  value: number;
}

// State
interface simulationState {
  running: boolean;
}

interface parameterState {
  damping: number;
}

export interface StoreState {
  simulation: simulationState;
  parameters: parameterState;
}