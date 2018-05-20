import PendulumVisualization from './canvas/pendulum_visualization';


(window as any).Module = {
  locateFile(file: string): string {
    return './assets/js/' + file;
  },

  onRuntimeInitialized(): void {
    const canvas1 = <HTMLCanvasElement> document.getElementById('canvas1');
    const sim1 = new (window as any).Module.Pendulum(179 * Math.PI / 180);
    const viz1 = new PendulumVisualization(canvas1, sim1);

    viz1.initialize();
    viz1.tick();
  }
};