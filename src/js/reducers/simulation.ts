import { combineReducers } from 'redux';
import {
  Actions
} from '../actions/simulation'
import {
  BaseAction,
  ParameterAction
} from '../types/index';

const initialSimulation = {
  initialized: false,
  running: false
};

function simulation(state = initialSimulation, action: BaseAction) {
  switch(action.type) {
    case Actions.INITIALIZED:
      return {
        ...state,
        initialized: true
      };
    case Actions.RUN_SIMULATION:
      return {
        ...state,
        running: true
      };
    case Actions.STOP_SIMULATION:
      return {
        ...state,
        running: false
      };
    default:
      return state;
  }
}

const initialParameters = {
  startTheta: 0,
  startOmega: 0,
  damping: 0,
  driveAmplitude: 0,
  driveFrequency: 0,
  simulationSpeed: 1,
};

function presets(preset: string): {} | undefined {
  switch(preset) {
    case 'small-angle-approx':
      return {
        startTheta: 30,
        startOmega: 0,
        damping: 0,
        driveAmplitude: 0,
        driveFrequency: 0
      };
    case 'jacobian-elliptical':
      return {
        startTheta: 90,
        startOmega: 0,
        damping: 0,
        driveAmplitude: 0,
        driveFrequency: 0
      };
    case 'separatrix':
      return {
        startTheta: 0,
        startOmega: 114.5915590259,
        damping: 0,
        driveAmplitude: 0,
        driveFrequency: 0
      };
    case 'full-rotations':
      return {
        startTheta: 0,
        startOmega: 120,
        damping: 0,
        driveAmplitude: 0,
        driveFrequency: 0
      };
    case 'limit-cycle':
      return {
        damping: 0.5,
        driveAmplitude: 1,
        driveFrequency: 0
      };
    case 'periodic1':
      return {
        damping: 0.5,
        driveAmplitude: 0.9,
        driveFrequency: 0.667
      };
    case 'periodic2':
      return {
        damping: 0.5,
        driveAmplitude: 1.08,
        driveFrequency: 0.667
      };
    case 'chaos1':
      return {
        damping: 0.5,
        driveAmplitude: 1.15,
        driveFrequency: 0.667
      };
    case 'periodic3':
      return {
        damping: 0.5,
        driveAmplitude: 1.35,
        driveFrequency: 0.667
      };
    case 'periodic4':
      return {
        damping: 0.5,
        driveAmplitude: 1.45,
        driveFrequency: 0.667
      };
    case 'periodic5':
      return {
        damping: 0.5,
        driveAmplitude: 1.47,
        driveFrequency: 0.667
      };
    case 'chaos2':
      return {
        damping: 0.5,
        driveAmplitude: 1.5,
        driveFrequency: 0.667
      };
    case 'periodic6':
      return {
        damping: 0.5,
        driveAmplitude: 1.345,
        driveFrequency: 0.7
      };
    default:
      return undefined;
  }
}

function parameters(state = initialParameters, action: ParameterAction) {
  switch (action.type) {
    case Actions.CHANGE_SIMULATION_SPEED:
    return {
      ...state,
      simulationSpeed: action.value as number
    };
    case Actions.CHANGE_START_THETA:
      return {
        ...state,
        startTheta: action.value as number
      };
    case Actions.CHANGE_START_OMEGA:
      return {
        ...state,
        startOmega: action.value as number
      };
    case Actions.CHANGE_DAMPING:
      return {
        ...state,
        damping: action.value as number
      };
    case Actions.CHANGE_DRIVE_AMPLITUDE:
      return {
        ...state,
        driveAmplitude: action.value as number
      };
    case Actions.CHANGE_DRIVE_FREQUENCY:
      return {
        ...state,
        driveFrequency: action.value as number
      };
    case Actions.CHOOSE_PRESET:
      const preset = presets(action.value as string);
      if (preset) {
        return {
          ...state,
          ...preset
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}

export default combineReducers({
  simulation,
  parameters
})