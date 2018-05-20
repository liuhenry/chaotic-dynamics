import * as React from 'react';
import { connect } from 'react-redux';

import { StoreState } from '../types/index';
import { runSimulation } from '../actions/simulation';
import store from '../stores/simulation';
import PendulumVisualization from '../canvas/pendulum_visualization';


(window as any).Module = {
  initialized: false,

  locateFile(file: string): string {
    return './assets/js/' + file;
  },

  onRuntimeInitialized(): void {
    this.initialized = true;
    store.dispatch(runSimulation());
  }
};

interface Props {
  width?: number;
  height?: number;
  running: boolean;
  parameters: {
    damping: number
  };
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
    if (this.props.running) {
      if (!this.state.model && this.state.canvas) {
        const model = new (window as any).Module.Pendulum(179 * Math.PI / 180, 0);
        const simulation = new PendulumVisualization(this.state.canvas, model);
        simulation.initialize();
        simulation.setParameters(this.props.parameters.damping);
        const animationID = simulation.start();
        this.setState({
          model,
          simulation
        });
      } else {
        if (!!this.state.simulation) {
          if (JSON.stringify(this.props.parameters) !== JSON.stringify(prevProps.parameters)) {
            this.state.simulation.setParameters(this.props.parameters.damping);
          }
        }
      }
    }
  }

  render() {
    return <canvas id="canvas" width="800px" height="500px"></canvas>;
  }
}

function mapStateToProps(state: StoreState) {
  return {
    running: state.simulation.running,
    parameters: state.parameters
  };
}

export default connect(mapStateToProps)(Canvas);