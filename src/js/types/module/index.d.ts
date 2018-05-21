declare namespace module {
  interface PendulumSimulation {
    theta: number;
    omega: number;
    phi: number;
    drive: number;
    historySize: number;
    poincareSize: number;
    tick(speed: number, damping: number, driveAmplitude: number, driveFrequency: number): void;
    theta_idx(i: number): number;
    omega_idx(i: number): number;
    poincare_theta(i: number): number;
    poincare_omega(i: number): number;
    clear_poincare(): void;
  }
}