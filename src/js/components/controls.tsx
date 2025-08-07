import React, { useState, useCallback } from 'react';
import Slider from 'rc-slider';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  changeSimulationSpeed,
  changeStartTheta,
  changeStartOmega,
  changeDamping,
  changeDriveAmplitude,
  changeDriveFrequency,
  runSimulation,
  stopSimulation,
  choosePreset,
} from '../store/simulationSlice';

import 'rc-slider/assets/index.css';

const Controls: React.FC = () => {
  const dispatch = useAppDispatch();

  // Select state from store
  const running = useAppSelector((state) => state.simulation.running);
  const simulationSpeed = useAppSelector((state) => state.simulation.simulationSpeed);
  const theta = useAppSelector((state) => state.simulation.startTheta);
  const omega = useAppSelector((state) => state.simulation.startOmega);
  const damping = useAppSelector((state) => state.simulation.damping);
  const driveAmplitude = useAppSelector((state) => state.simulation.driveAmplitude);
  const driveFrequency = useAppSelector((state) => state.simulation.driveFrequency);

  const [simulationSpeedMode, setSimulationSpeedMode] = useState(1);

  const handleSimulationSpeedChange = useCallback(
    (value: number) => {
      setSimulationSpeedMode(value);
      // Map slider position to actual speed values
      const speedMap: { [key: number]: number } = {
        1: 1,
        2: 2,
        3: 5,
        4: 1000,
      };
      dispatch(changeSimulationSpeed(speedMap[value] || 1));
    },
    [dispatch]
  );

  const handleSelectPreset = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(choosePreset(event.target.value));
    },
    [dispatch]
  );

  const handleThetaChange = useCallback(
    (value: number | number[]) => {
      dispatch(changeStartTheta(Array.isArray(value) ? value[0] : value));
    },
    [dispatch]
  );

  const handleOmegaChange = useCallback(
    (value: number | number[]) => {
      dispatch(changeStartOmega(Array.isArray(value) ? value[0] : value));
    },
    [dispatch]
  );

  const handleDampingChange = useCallback(
    (value: number | number[]) => {
      const numValue = Array.isArray(value) ? value[0] : value;
      dispatch(changeDamping(Number(Math.round(Number(numValue + 'e3')) + 'e-3')));
    },
    [dispatch]
  );

  const handleDriveAmplitudeChange = useCallback(
    (value: number | number[]) => {
      const numValue = Array.isArray(value) ? value[0] : value;
      dispatch(changeDriveAmplitude(Number(Math.round(Number(numValue + 'e4')) + 'e-4')));
    },
    [dispatch]
  );

  const handleDriveFrequencyChange = useCallback(
    (value: number | number[]) => {
      const numValue = Array.isArray(value) ? value[0] : value;
      dispatch(changeDriveFrequency(Number(Math.round(Number(numValue + 'e4')) + 'e-4')));
    },
    [dispatch]
  );

  const handleRunSimulation = useCallback(() => {
    dispatch(runSimulation());
  }, [dispatch]);

  const handleStopSimulation = useCallback(() => {
    dispatch(stopSimulation());
  }, [dispatch]);

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
                '180': '180',
              }}
              value={theta}
              onChange={handleThetaChange}
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
              onChange={handleOmegaChange}
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
                '1': '1',
              }}
              value={damping}
              onChange={handleDampingChange}
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
                '2': '2',
              }}
              value={driveAmplitude}
              onChange={handleDriveAmplitudeChange}
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
                '2': '2',
              }}
              value={driveFrequency}
              onChange={handleDriveFrequencyChange}
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
                4: 'Plotter',
              }}
              value={simulationSpeedMode}
              onChange={(value) =>
                handleSimulationSpeedChange(Array.isArray(value) ? value[0] : value)
              }
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
              <option value="periodic6">Singly Periodic (0.5, 1.345, 0.7)</option>
            </optgroup>
          </select>
        </div>
      </div>
      <div className="tc">
        {!running ? (
          <a
            className="center f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-blue"
            onClick={handleRunSimulation}
          >
            Run Simulation
          </a>
        ) : (
          <a
            className="center f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib dark-blue"
            onClick={handleStopSimulation}
          >
            Stop Simulation
          </a>
        )}
      </div>
    </div>
  );
};

export default React.memo(Controls);
