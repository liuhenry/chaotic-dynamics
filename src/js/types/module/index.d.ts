declare namespace module {
  interface PendulumSimulation {
    theta: number;
    omega: number;
    historySize: number;
    tick(damping: number): void;
    theta_idx(i: number): number;
    omega_idx(i: number): number;
  }
}