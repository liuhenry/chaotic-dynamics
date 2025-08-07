import React, { useEffect, useRef, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { ParameterState } from '../types/index';
import { initialized, stopSimulation } from '../store/simulationSlice';
import { store } from '../store/store';
import PendulumVisualization from '../canvas/pendulum_visualization';

// Listen for WASM initialization
if (window.Module?.initialized) {
  // Already initialized
  store.dispatch(initialized());
} else {
  // Wait for initialization
  window.addEventListener('wasmInitialized', () => {
    store.dispatch(initialized());
  });
}

const Canvas: React.FC = () => {
  const dispatch = useAppDispatch();

  // Select state from store
  const isInitialized = useAppSelector((state) => state.simulation.initialized);
  const running = useAppSelector((state) => state.simulation.running);
  const speed = useAppSelector((state) => state.simulation.simulationSpeed);
  const parameters: ParameterState = useAppSelector((state) => ({
    simulationSpeed: state.simulation.simulationSpeed,
    startTheta: state.simulation.startTheta,
    startOmega: state.simulation.startOmega,
    damping: state.simulation.damping,
    driveAmplitude: state.simulation.driveAmplitude,
    driveFrequency: state.simulation.driveFrequency,
  }));

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<module.PendulumSimulation | null>(null);
  const [simulation, setSimulation] = useState<PendulumVisualization | null>(null);
  const prevParamsRef = useRef<ParameterState>(parameters);
  const prevSpeedRef = useRef<number>(speed);
  const prevRunningRef = useRef<boolean>(running);

  useEffect(() => {
    if (isInitialized && canvasRef.current) {
      if (
        !model ||
        parameters.startTheta !== prevParamsRef.current.startTheta ||
        parameters.startOmega !== prevParamsRef.current.startOmega
      ) {
        const newModel = new window.Module!.Pendulum(
          (parameters.startTheta * Math.PI) / 180,
          (parameters.startOmega * Math.PI) / 180
        );

        if (simulation) {
          simulation.changeModel(newModel);
        }

        setModel(newModel);
      }

      if (canvasRef.current && model && !simulation) {
        const newSimulation = new PendulumVisualization(canvasRef.current, model);
        newSimulation.initialize();
        setSimulation(newSimulation);
      }

      if (simulation) {
        const parametersChangedString = JSON.stringify(parameters);
        const prevParametersChangedString = JSON.stringify(prevParamsRef.current);

        if (
          parametersChangedString !== prevParametersChangedString ||
          speed !== prevSpeedRef.current ||
          running !== prevRunningRef.current
        ) {
          simulation.updateParameters(parameters, speed, running);
        }

        prevParamsRef.current = parameters;
        prevSpeedRef.current = speed;
        prevRunningRef.current = running;
      }
    }
  }, [isInitialized, model, simulation, parameters, speed, running]);

  useEffect(() => {
    return () => {
      if (simulation) {
        dispatch(stopSimulation());
      }
    };
  }, [simulation, dispatch]);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      width="1600px"
      height="1000px"
      className="fl w-100 ba"
    ></canvas>
  );
};

export default React.memo(Canvas);
