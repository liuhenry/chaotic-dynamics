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
    case 'chaos1':
      return {
        damping: 0.5,
        driveAmplitude: 1.5,
        driveFrequency: 0.667
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
      simulationSpeed: action.value
    };
    case Actions.CHANGE_START_THETA:
      return {
        ...state,
        startTheta: action.value
      };
    case Actions.CHANGE_START_OMEGA:
      return {
        ...state,
        startOmega: action.value
      };
    case Actions.CHANGE_DAMPING:
      return {
        ...state,
        damping: action.value
      };
    case Actions.CHANGE_DRIVE_AMPLITUDE:
      return {
        ...state,
        driveAmplitude: action.value
      };
    case Actions.CHANGE_DRIVE_FREQUENCY:
      return {
        ...state,
        driveFrequency: action.value
      };
    case Actions.CHOOSE_PRESET:
      const preset = presets(action.value);
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