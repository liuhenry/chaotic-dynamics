import * as React from 'react';
import { Dispatch, connect } from 'react-redux';
import Slider from 'rc-slider';

import { StoreState } from '../types/index';
import {
  changeSimulationSpeed,
  changeStartTheta,
  changeStartOmega,
  changeDamping,
  changeDriveAmplitude,
  changeDriveFrequency,
  runSimulation,
  stopSimulation,
  choosePreset
} from '../actions/simulation';

import 'rc-slider/assets/index.css';


interface Props {
  running: boolean;
  simulationSpeed: number;
  theta: number;
  omega: number;
  damping: number;
  driveAmplitude: number;
  driveFrequency: number;
  run(): void;
  stop(): void;
  onSimulationSpeedChange(value: number): void;
  onThetaChange(value: number): void;
  onOmegaChange(value: number): void;
  onDampingChange(value: number): void;
  onDriveAmplitudeChange(value: number): void;
  onDriveFrequencyChange(value: number): void;
  onPresetChange(value: string): void;
}

interface State {
  simulationSpeedMode: number;
  presetValue?: string;
}

class Controls extends React.Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = {
      simulationSpeedMode: 1
    };
  }

  onSimulationSpeedChange(value: number) {
    this.setState({
      simulationSpeedMode: value
    });
    this.props.onSimulationSpeedChange(value);
  }

  onSelectPreset(event: Event) {
    console.log(event.target.value);
    this.props.onPresetChange(event.target.value);
  }

  render() {
    const {
      simulationSpeed,
      theta, omega,
      damping, driveAmplitude, driveFrequency
    } = this.props;
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
              onChange={this.props.onDampingChange.bind(this)}
            />
          </div>
        </div>
      </div>
      <div className="tc pb3">
          Drive Amplitude
          <div className="flex items-center">
          <div className="fl w-10 pa2">{driveAmplitude}</div>
          <div className="fl w-90 pa2 pl3">
            <Slider
              min={0}
              max={2}
              step={0.01}
              value={driveAmplitude}
              onChange={this.props.onDriveAmplitudeChange.bind(this)}
            />
            </div>
          </div>
        </div>
        <div className="tc pb3">
          Drive Frequency
          <div className="flex items-center">
          <div className="fl w-10 pa2">{driveFrequency}</div>
          <div className="fl w-90 pa2 pl3">
            <Slider
              min={0}
              max={2}
              step={0.001}
              value={driveFrequency}
              onChange={this.props.onDriveFrequencyChange.bind(this)}
            />
            </div>
          </div>
        </div>
        <div className="tc pb3">
          Simulation Speed
          <div className="flex items-center">
          <div className="fl w-10 pa2">{simulationSpeed}</div>
          <div className="fl w-90 pa2 pl3">
            <Slider
              min={1}
              max={4}
              marks={{
                1: 'Normal',
                2: 'Double',
                3: 'Fast',
                4: 'Plotter'
              }}
              step={null}
              value={this.state.simulationSpeedMode}
              onChange={this.onSimulationSpeedChange.bind(this)}
            />
            </div>
          </div>
        </div>
        <div className="tc pt4 pb3">
          Interesting Presets
          <div className="w-70 center pv3">
            <select className="w-100" onChange={this.onSelectPreset.bind(this)}>
            <option value="nothing"></option>
            <option value="chaos1">Chaos (0.5, 1.5, 0.667)</option>
            </select>
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
    simulationSpeed: state.parameters.simulationSpeed,
    theta: state.parameters.startTheta,
    omega: state.parameters.startOmega,
    damping: state.parameters.damping,
    driveAmplitude: state.parameters.driveAmplitude,
    driveFrequency: state.parameters.driveFrequency
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
    onSimulationSpeedChange(value: number) {
      switch(value) {
        case 1:
          return dispatch(changeSimulationSpeed(1));
        case 2:
          return dispatch(changeSimulationSpeed(2));
        case 3:
          return dispatch(changeSimulationSpeed(5));
        case 4:
          return dispatch(changeSimulationSpeed(1000));
      }
    },
    onThetaChange(value: number) {
      dispatch(changeStartTheta(value));
    },
    onOmegaChange(value: number) {
      dispatch(changeStartOmega(value));
    },
    onDampingChange(value: number) {
      dispatch(changeDamping(Number(Math.round(Number(value + 'e3')) + 'e-3')));
    },
    onDriveAmplitudeChange(value: number) {
      dispatch(changeDriveAmplitude(Number(Math.round(Number(value + 'e3')) + 'e-3')));
    },
    onDriveFrequencyChange(value: number) {
      dispatch(changeDriveFrequency(Number(Math.round(Number(value + 'e4')) + 'e-4')));
    },
    onPresetChange(value: string) {
      dispatch(choosePreset(value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)