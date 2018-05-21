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
  startTheta: 90,
  startOmega: 0,
  damping: 0
};

function parameters(state = initialParameters, action: ParameterAction) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export default combineReducers({
  simulation,
  parameters
})