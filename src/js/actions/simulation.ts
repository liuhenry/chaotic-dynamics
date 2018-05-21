import { ParameterAction } from '../types/index';

export const Actions = {
  INITIALIZED: 'INITIALIZED',
  RUN_SIMULATION: 'RUN_SIMULATION',
  STOP_SIMULATION: 'STOP_SIMULATION',
  CHANGE_SIMULATION_SPEED: 'CHANGE_SIMULATION_SPEED',
  CHANGE_START_THETA: 'CHANGE_START_THETA',
  CHANGE_START_OMEGA: 'CHANGE_START_OMEGA',
  CHANGE_DAMPING: 'CHANGE_DAMPING',
  CHANGE_DRIVE_AMPLITUDE: 'CHANGE_DRIVE_AMPLITUDE',
  CHANGE_DRIVE_FREQUENCY: 'CHANGE_DRIVE_FREQUENCY',
  CHOOSE_PRESET: 'CHOOSE_PRESET'
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

export function changeSimulationSpeed(value: number): ParameterAction {
  return {
    type: Actions.CHANGE_SIMULATION_SPEED,
    value
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

export function changeDriveAmplitude(value: number): ParameterAction {
  return {
    type: Actions.CHANGE_DRIVE_AMPLITUDE,
    value
  };
}

export function changeDriveFrequency(value: number): ParameterAction {
  return {
    type: Actions.CHANGE_DRIVE_FREQUENCY,
    value
  };
}

export function choosePreset(value: string): {type: string, value: string} {
  return {
    type: Actions.CHOOSE_PRESET,
    value
  };
}