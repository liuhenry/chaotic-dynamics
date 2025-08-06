import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { StoreState, ParameterState } from '../types/index';
import { initialized, stopSimulation } from '../actions/simulation';
import store from '../stores/simulation';
import PendulumVisualization from '../canvas/pendulum_visualization';


// Listen for WASM initialization
if ((window as any).Module?.initialized) {
  // Already initialized
  store.dispatch(initialized());
} else {
  // Wait for initialization
  window.addEventListener('wasmInitialized', () => {
    store.dispatch(initialized());
  });
}

interface Props {
  initialized: boolean;
  running: boolean;
  speed: number;
  parameters: ParameterState;
  stop(): void;
}

const Canvas: React.FC<Props> = ({ initialized, running, speed, parameters, stop }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<any>(null);
  const [simulation, setSimulation] = useState<PendulumVisualization | null>(null);
  const prevParamsRef = useRef<ParameterState>(parameters);
  const prevSpeedRef = useRef<number>(speed);
  const prevRunningRef = useRef<boolean>(running);

  useEffect(() => {
    if (initialized && canvasRef.current) {
      if (!model ||
        parameters.startTheta !== prevParamsRef.current.startTheta ||
        parameters.startOmega !== prevParamsRef.current.startOmega
      ) {
        const newModel = new (window as any).Module.Pendulum(
          parameters.startTheta * Math.PI / 180,
          parameters.startOmega * Math.PI / 180
        );

        if (simulation) {
          simulation.stop();
          stop();
        }

        const newSimulation = new PendulumVisualization(canvasRef.current, newModel);
        const { damping, driveAmplitude, driveFrequency } = parameters;
        newSimulation.setSpeed(speed);
        newSimulation.setParameters(damping, driveAmplitude, driveFrequency);
        newSimulation.initialize();
        
        setModel(newModel);
        setSimulation(newSimulation);
        prevParamsRef.current = parameters;
        return;
      }

      if (simulation) {
        if (speed !== prevSpeedRef.current) {
          simulation.setSpeed(speed);
          prevSpeedRef.current = speed;
        }
        
        if (JSON.stringify(parameters) !== JSON.stringify(prevParamsRef.current)) {
          const { damping, driveAmplitude, driveFrequency } = parameters;
          simulation.setParameters(damping, driveAmplitude, driveFrequency);
          prevParamsRef.current = parameters;
        }

        if (running) {
          if (!prevRunningRef.current) {
            simulation.start();
          }
        } else {
          simulation.stop();
        }
        prevRunningRef.current = running;
      }
    }
  }, [initialized, running, speed, parameters, model, simulation, stop]);

  return <canvas ref={canvasRef} id="canvas" width="1600px" height="1000px" className="fl w-100 ba"></canvas>;
};

function mapStateToProps(state: StoreState) {
  return {
    initialized: state.simulation.initialized,
    running: state.simulation.running,
    speed: state.parameters.simulationSpeed,
    parameters: state.parameters
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