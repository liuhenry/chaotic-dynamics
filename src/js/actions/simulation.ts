export const Actions = {
  RUN_SIMULATION: 'RUN_SIMULATION',
  CHANGE_DAMPING: 'CHANGE_DAMPING'
}

export function runSimulation() {
  return {
    type: Actions.RUN_SIMULATION
  };
}

export function changeDamping(value: number): reduxSimulation.ParameterAction {
  return {
    type: Actions.CHANGE_DAMPING,
    value
  };
}