declare namespace module {
  interface PendulumSimulation {
    theta: number;
    omega: number;
    drive: number;
    historySize: number;
    tick(damping: number, driveAmplitude: number, driveFrequency: number): void;
    theta_idx(i: number): number;
    omega_idx(i: number): number;
  }
}