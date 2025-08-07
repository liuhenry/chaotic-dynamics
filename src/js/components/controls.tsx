import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
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

const Controls: React.FC<Props> = ({
  running,
  simulationSpeed,
  theta,
  omega,
  damping,
  driveAmplitude,
  driveFrequency,
  run,
  stop,
  onSimulationSpeedChange,
  onThetaChange,
  onOmegaChange,
  onDampingChange,
  onDriveAmplitudeChange,
  onDriveFrequencyChange,
  onPresetChange
}) => {
  const [simulationSpeedMode, setSimulationSpeedMode] = useState(1);

  const handleSimulationSpeedChange = (value: number) => {
    setSimulationSpeedMode(value);
    onSimulationSpeedChange(value);
  };

  const handleSelectPreset = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPresetChange(event.target.value);
  };

  return (
    <div>
      <div className="tc pb3">
        Starting Angle
        <div className="flex items-center">
          <div className="fl w-10 pa2 pl0">{theta}</div>
          <div className="fl w-90 pa2 pl3">
            <Slider
              min={-180}
              max={180}
              step={15}
              marks={{
                '-180': '-180',
                '-90': '-90',
                '0': '0',
                '90': '90',
                '180': '180'
              }}
              value={theta}
              onChange={(value) => onThetaChange(Array.isArray(value) ? value[0] : value)}
            />
          </div>
        </div>
      </div>
      <div className="tc pb3">
        Starting Angular Velocity
        <div className="flex items-center">
          <div className="fl w-10 pa2 pl0">{omega}</div>
          <div className="fl w-90 pa2 pl3">
            <Slider
              min={-180}
              max={180}
              step={15}
              marks={{
                '-180': '-180',
                '-90': '-90',
                '0': '0',
                '90': '90',
                '180': '180',
              }}
              value={omega}
              onChange={(value) => onOmegaChange(Array.isArray(value) ? value[0] : value)}
            />
          </div>
        </div>
      </div>
      <div className="tc pb3">
        Damping
        <div className="flex items-center">
          <div className="fl w-10 pa2 pl0">{damping}</div>
          <div className="fl w-90 pa2 pl3">
            <Slider
              min={0}
              max={1}
              step={0.01}
              marks={{
                '0': '0',
                '0.5': '0.5',
                '1': '1'
              }}
              value={damping}
              onChange={(value) => onDampingChange(Array.isArray(value) ? value[0] : value)}
            />
          </div>
        </div>
      </div>
      <div className="tc pb3">
        Drive Amplitude
        <div className="flex items-center">
          <div className="fl w-10 pa2 pl0">{driveAmplitude}</div>
          <div className="fl w-90 pa2 pl3">
            <Slider
              min={0}
              max={2}
              step={0.001}
              marks={{
                '0': '0',
                '0.5': '0.5',
                '1': '1',
                '1.5': '1.5',
                '2': '2'
              }}
              value={driveAmplitude}
              onChange={(value) => onDriveAmplitudeChange(Array.isArray(value) ? value[0] : value)}
            />
          </div>
        </div>
      </div>
      <div className="tc pb3">
        Drive Frequency
        <div className="flex items-center">
          <div className="fl w-10 pa2 pl0">{driveFrequency}</div>
          <div className="fl w-90 pa2 pl3">
            <Slider
              min={0}
              max={2}
              step={0.001}
              marks={{
                '0': '0',
                '0.667': '0.667',
                '1': '1',
                '2': '2'
              }}
              value={driveFrequency}
              onChange={(value) => onDriveFrequencyChange(Array.isArray(value) ? value[0] : value)}
            />
          </div>
        </div>
      </div>
      <div className="tc pb3">
        Simulation Speed
        <div className="flex items-center">
          <div className="fl w-10 pa2 pl0">{simulationSpeed}</div>
          <div className="fl w-90 pa2 pl3">
            <Slider
              min={1}
              max={4}
              step={null}
              marks={{
                1: 'Normal',
                2: 'Double',
                3: 'Fast',
                4: 'Plotter'
              }}
              value={simulationSpeedMode}
              onChange={(value) => handleSimulationSpeedChange(Array.isArray(value) ? value[0] : value)}
            />
          </div>
        </div>
      </div>
      <div className="tc pt4 pb3">
        Interesting Presets
        <div className="w-70 center pv3">
          <select className="w-100" onChange={handleSelectPreset}>
            <option value="nothing"></option>
            <optgroup label="Simple Pendulum">
              <option value="small-angle-approx">Small Angle Pendulum (SHM)</option>
              <option value="jacobian-elliptical">Jacobian Elliptical</option>
              <option value="separatrix">Separatrix</option>
              <option value="full-rotations">Full Rotations</option>
            </optgroup>
            <optgroup label="Damped, Driven Pendulum (Drive Frequency 2/3)">
              <option value="limit-cycle">Limit Cycle</option>
              <option value="periodic1">Singly Periodic (0.5, 0.9, 0.667)</option>
              <option value="periodic2">Doubly Periodic (0.5, 1.08, 0.667)</option>
              <option value="chaos1">Chaos (0.5, 1.15, 0.667)</option>
              <option value="periodic3">Singly Periodic (0.5, 1.35, 0.667)</option>
              <option value="periodic4">Doubly Periodic (0.5, 1.45, 0.667)</option>
              <option value="periodic5">Quadruply Periodic (0.5, 1.47, 0.667)</option>
              <option value="chaos2">Chaos (0.5, 1.5, 0.667)</option>
            </optgroup>
            <optgroup label="Damped, Driven Pendulum">
              <option value="periodic6">Edge of Chaos (0.5, 1.345, 0.7)</option>
            </optgroup>
          </select>
        </div>
      </div>
      <div className="ph3 flex items-center">
        {!running ?
          <a className="center f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-blue"
            onClick={run}>
            Run Simulation
          </a> :
          <a className="center f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib dark-blue"
            onClick={stop}>
            Stop Simulation
          </a>}
      </div>
    </div>
  );
};

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
          dispatch(changeSimulationSpeed(1));
          break;
        case 2:
          dispatch(changeSimulationSpeed(2));
          break;
        case 3:
          dispatch(changeSimulationSpeed(5));
          break;
        case 4:
          dispatch(changeSimulationSpeed(1000));
          break;
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
      dispatch(changeDriveAmplitude(Number(Math.round(Number(value + 'e4')) + 'e-4')));
    },
    onDriveFrequencyChange(value: number) {
      dispatch(changeDriveFrequency(Number(Math.round(Number(value + 'e4')) + 'e-4')));
    },
    onPresetChange(value: string) {
      dispatch(choosePreset(value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);