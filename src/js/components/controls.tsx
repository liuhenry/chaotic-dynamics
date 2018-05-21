import * as React from 'react';
import { Dispatch, connect } from 'react-redux';
import Slider from 'rc-slider';

import { StoreState } from '../types/index';
import {
  changeStartTheta,
  changeStartOmega,
  changeDamping,
  runSimulation,
  stopSimulation
} from '../actions/simulation';

import 'rc-slider/assets/index.css';


interface Props {
  running: boolean;
  theta: number;
  omega: number;
  damping: number;
  run(): void;
  stop(): void;
  onThetaChange(value: number): void;
  onOmegaChange(value: number): void;
  onDampingChange(value: number): void;
}

class Controls extends React.Component<Props> {
  render() {
    const { theta, omega, damping } = this.props;
    return (
      <div>
        <div className="tc pb3">
          Starting Angle
          <div className="flex items-center">
          <div className="fl w-10 pa2">{theta}</div>
          <div className="fl w-90 pa2 pl3">
            <Slider
              min={-180}
              max={180}
              value={theta}
              onChange={this.props.onThetaChange.bind(this)}
            />
            </div>
          </div>
        </div>
        <div className="tc pb3">
          Starting Angular Velocity
          <div className="flex items-center">
          <div className="fl w-10 pa2">{omega}</div>
          <div className="fl w-90 pa2 pl3">
            <Slider
              min={-270}
              max={270}
              value={omega}
              onChange={this.props.onOmegaChange.bind(this)}
            />
            </div>
          </div>
        </div>
        <div className="tc pb3">
          Damping
          <div className="flex items-center">
          <div className="fl w-10 pa2">{damping}</div>
          <div className="fl w-90 pa2 pl3">
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={damping}
            />
          </div>
        </div>
      </div>
      <div className="tc pb3">
          Drive Phase
          <div className="flex items-center">
          <div className="fl w-10 pa2">{damping}</div>
          <div className="fl w-90 pa2 pl3">
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={damping}
              onChange={this.props.onDampingChange.bind(this)}
            />
            </div>
          </div>
        </div>
        <div className="ph3 flex items-center">
          {!this.props.running ?
          <a className="center f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib dark-blue"
            onClick={this.props.run.bind(this)}>
            Run Simulation
          </a> :
          <a className="center f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib dark-blue"
            onClick={this.props.stop.bind(this)}>
            Stop Simulation
          </a>}
        </div>
    </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    running: state.simulation.running,
    theta: state.parameters.startTheta,
    omega: state.parameters.startOmega,
    damping: state.parameters.damping
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    run() {
      dispatch(runSimulation());
    },
    stop() {
      dispatch(stopSimulation());
    },
    onThetaChange(value: number) {
      dispatch(changeStartTheta(value));
    },
    onOmegaChange(value: number) {
      dispatch(changeStartOmega(value));
    },
    onDampingChange(value: number) {
      dispatch(changeDamping(Number(Math.round(Number(value + 'e3')) + 'e-3')));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)