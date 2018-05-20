import * as React from 'react';
import { connect } from 'react-redux';

import { runSimulation } from '../actions/simulation';
import store from '../stores/simulation';
import PendulumVisualization from '../canvas/pendulum_visualization';


interface CanvasProps {
  width?: number;
  height?: number;
}


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

class Canvas extends React.Component<CanvasProps> {
  state: {
    canvas?: HTMLCanvasElement;
    model?: module.PendulumSimulation;
    simulation?: PendulumVisualization;
  }

  componentDidMount() {
    this.setState({
      canvas: document.getElementById('canvas')
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.running) {
      if (this.state.model === undefined) {
        const model = new (window as any).Module.Pendulum(179 * Math.PI / 180, 1);
        const simulation = new PendulumVisualization(this.state.canvas, model);
        simulation.initialize();
        simulation.setParameters(this.props.parameters.damping);
        const animationID = simulation.start();
        this.setState({
          model,
          simulation
        });
      } else {
        if (JSON.stringify(this.props.parameters) !== JSON.stringify(prevProps.parameters)) {
          this.state.simulation.setParameters(this.props.parameters.damping);
        }
      }
    }
  }

  render() {
    return <canvas id="canvas" width="800px" height="500px"></canvas>;
  }
}

function mapStateToProps(state) {
  return {
    running: state.state.running,
    parameters: state.parameters
  };
}

export default connect(mapStateToProps)(Canvas);