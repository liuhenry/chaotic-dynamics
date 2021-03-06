import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { StoreState, ParameterState } from '../types/index';
import { initialized, runSimulation, stopSimulation } from '../actions/simulation';
import store from '../stores/simulation';
import PendulumVisualization from '../canvas/pendulum_visualization';


(window as any).Module = {
  initialized: false,

  locateFile(file: string): string {
    return './assets/js/' + file;
  },

  onRuntimeInitialized(): void {
    this.initialized = true;
    store.dispatch(initialized());
  }
};

interface Props {
  initialized: boolean;
  running: boolean;
  speed: number;
  parameters: ParameterState;
  stop(): void;
}

interface State {
  canvas?: HTMLCanvasElement;
  model?: module.PendulumSimulation;
  simulation?: PendulumVisualization;
}

class Canvas extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      canvas: document.getElementById('canvas') as HTMLCanvasElement
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.initialized && this.state.canvas) {
      if (!this.state.model ||
        this.props.parameters.startTheta !== prevProps.parameters.startTheta ||
        this.props.parameters.startOmega !== prevProps.parameters.startOmega
      ) {

        const model = new (window as any).Module.Pendulum(
          this.props.parameters.startTheta * Math.PI / 180,
          this.props.parameters.startOmega * Math.PI / 180
        );

        if (this.state.simulation) {
          this.state.simulation.stop();
          this.props.stop();
        }

        const simulation = new PendulumVisualization(this.state.canvas, model);
        const {
          damping, driveAmplitude, driveFrequency
        } = this.props.parameters;
        simulation.setSpeed(this.props.speed);
        simulation.setParameters(damping, driveAmplitude, driveFrequency);
        simulation.initialize();
        this.setState({
          model,
          simulation
        });
        return;
      }

      if (this.state.simulation) {
        if (this.props.speed !== prevProps.speed) {
          this.state.simulation.setSpeed(this.props.speed);
        }
        if (JSON.stringify(this.props.parameters) !== JSON.stringify(prevProps.parameters)) {
          const {
            simulationSpeed: speed, damping, driveAmplitude, driveFrequency
          } = this.props.parameters;
          this.state.simulation.setParameters(damping, driveAmplitude, driveFrequency);
        }

        if (this.props.running) {
          if (!prevProps.running) {
            this.state.simulation.start();
          }
        } else {
          this.state.simulation.stop();
        }
      }


    }


  }

  render() {
    return <canvas id="canvas" width="1600px" height="1000px" className="fl w-100 ba"></canvas>;
  }
}

function mapStateToProps(state: StoreState) {
  const { simulationSpeed: speed, ...parameters } = state.parameters;
  return {
    initialized: state.simulation.initialized,
    running: state.simulation.running,
    speed,
    parameters
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    stop() {
      dispatch(stopSimulation());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);