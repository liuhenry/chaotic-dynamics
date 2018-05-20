declare namespace reduxSimulation {
  export interface BaseAction {
    type: string;
  }
  export interface ParameterAction extends BaseAction {
    value: number;
  }
}