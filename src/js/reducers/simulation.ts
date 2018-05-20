import { combineReducers } from 'redux';
import {
  Actions
} from '../actions/simulation'
import {
  BaseAction,
  ParameterAction
} from '../types/index';

const initialSimulation = {
  running: false
};

function simulation(state = initialSimulation, action: BaseAction) {
  switch(action.type) {
    case Actions.RUN_SIMULATION:
      return {
        ...state,
        running: true
      };
    default:
      return state;
  }
}

const initialParameters = {
  damping: 0
};

function parameters(state = initialParameters, action: ParameterAction) {
  switch (action.type) {
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