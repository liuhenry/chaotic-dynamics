declare namespace module {
  interface Simulation {
    theta?: number;
    omega?: number;
    tick(): void;
  }
}