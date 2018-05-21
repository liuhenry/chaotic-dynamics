import { ParameterAction } from '../types/index';

export const Actions = {
  INITIALIZED: 'INITIALIZED',
  RUN_SIMULATION: 'RUN_SIMULATION',
  STOP_SIMULATION: 'STOP_SIMULATION',
  CHANGE_START_THETA: 'CHANGE_START_THETA',
  CHANGE_START_OMEGA: 'CHANGE_START_OMEGA',
  CHANGE_DAMPING: 'CHANGE_DAMPING'
}

export function initialized() {
  return {
    type: Actions.INITIALIZED
  };
}

export function runSimulation() {
  return {
    type: Actions.RUN_SIMULATION
  };
}

export function stopSimulation() {
  return {
    type: Actions.STOP_SIMULATION
  };
}

export function changeStartTheta(value: number): ParameterAction {
  return {
    type: Actions.CHANGE_START_THETA,
    value
  };
}

export function changeStartOmega(value: number): ParameterAction {
  return {
    type: Actions.CHANGE_START_OMEGA,
    value
  };
}

export function changeDamping(value: number): ParameterAction {
  return {
    type: Actions.CHANGE_DAMPING,
    value
  };
}