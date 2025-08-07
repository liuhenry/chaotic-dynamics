import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define preset configurations
const presets = {
  'small-angle-approx': {
    startTheta: 30,
    startOmega: 0,
    damping: 0,
    driveAmplitude: 0,
    driveFrequency: 0,
  },
  'jacobian-elliptical': {
    startTheta: 90,
    startOmega: 0,
    damping: 0,
    driveAmplitude: 0,
    driveFrequency: 0,
  },
  separatrix: {
    startTheta: 0,
    startOmega: 114.5915590259,
    damping: 0,
    driveAmplitude: 0,
    driveFrequency: 0,
  },
  'full-rotations': {
    startTheta: 0,
    startOmega: 120,
    damping: 0,
    driveAmplitude: 0,
    driveFrequency: 0,
  },
  'limit-cycle': {
    damping: 0.5,
    driveAmplitude: 1,
    driveFrequency: 0,
  },
  periodic1: {
    damping: 0.5,
    driveAmplitude: 0.9,
    driveFrequency: 0.667,
  },
  periodic2: {
    damping: 0.5,
    driveAmplitude: 1.08,
    driveFrequency: 0.667,
  },
  chaos1: {
    damping: 0.5,
    driveAmplitude: 1.15,
    driveFrequency: 0.667,
  },
  periodic3: {
    damping: 0.5,
    driveAmplitude: 1.35,
    driveFrequency: 0.667,
  },
  periodic4: {
    damping: 0.5,
    driveAmplitude: 1.45,
    driveFrequency: 0.667,
  },
  periodic5: {
    damping: 0.5,
    driveAmplitude: 1.47,
    driveFrequency: 0.667,
  },
  chaos2: {
    damping: 0.5,
    driveAmplitude: 1.5,
    driveFrequency: 0.667,
  },
  periodic6: {
    damping: 0.5,
    driveAmplitude: 1.345,
    driveFrequency: 0.7,
  },
} as const;

type PresetName = keyof typeof presets;

interface SimulationState {
  // Simulation status
  initialized: boolean;
  running: boolean;

  // Parameters
  startTheta: number;
  startOmega: number;
  damping: number;
  driveAmplitude: number;
  driveFrequency: number;
  simulationSpeed: number;
}

const initialState: SimulationState = {
  // Simulation status
  initialized: false,
  running: false,

  // Parameters
  startTheta: 0,
  startOmega: 0,
  damping: 0,
  driveAmplitude: 0,
  driveFrequency: 0,
  simulationSpeed: 1,
};

const simulationSlice = createSlice({
  name: 'simulation',
  initialState,
  reducers: {
    initialized: (state) => {
      state.initialized = true;
    },
    runSimulation: (state) => {
      state.running = true;
    },
    stopSimulation: (state) => {
      state.running = false;
    },
    changeSimulationSpeed: (state, action: PayloadAction<number>) => {
      state.simulationSpeed = action.payload;
    },
    changeStartTheta: (state, action: PayloadAction<number>) => {
      state.startTheta = action.payload;
    },
    changeStartOmega: (state, action: PayloadAction<number>) => {
      state.startOmega = action.payload;
    },
    changeDamping: (state, action: PayloadAction<number>) => {
      state.damping = action.payload;
    },
    changeDriveAmplitude: (state, action: PayloadAction<number>) => {
      state.driveAmplitude = action.payload;
    },
    changeDriveFrequency: (state, action: PayloadAction<number>) => {
      state.driveFrequency = action.payload;
    },
    choosePreset: (state, action: PayloadAction<string>) => {
      const presetName = action.payload as PresetName;
      const preset = presets[presetName];
      if (preset) {
        return {
          ...state,
          ...preset,
        };
      }
      return state;
    },
  },
});

// Export actions
export const {
  initialized,
  runSimulation,
  stopSimulation,
  changeSimulationSpeed,
  changeStartTheta,
  changeStartOmega,
  changeDamping,
  changeDriveAmplitude,
  changeDriveFrequency,
  choosePreset,
} = simulationSlice.actions;

// Export reducer
export default simulationSlice.reducer;
