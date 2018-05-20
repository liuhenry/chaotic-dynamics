import { combineReducers } from 'redux';
import {
  Actions
} from '../actions/simulation'

const initialState = {
  running: false
};

function state(state = initialState, action: reduxSimulation.BaseAction) {
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

function parameters(state = initialParameters, action: reduxSimulation.ParameterAction) {
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
  state,
  parameters
})