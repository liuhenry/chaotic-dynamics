import * as React from 'react';

import PendulumVisualization from './canvas/pendulum_visualization';


interface CanvasProps {
  width?: number;
  height?: number;
}


(window as any).Module = {
  locateFile(file: string): string {
    return './assets/js/' + file;
  },

  onRuntimeInitialized(): void {
    const canvas1 = document.getElementById('canvas') as HTMLCanvasElement;
    const sim1 = new (window as any).Module.Pendulum(179 * Math.PI / 180);
    const viz1 = new PendulumVisualization(canvas1, sim1);

    viz1.initialize();
    viz1.tick();
  }
};

export default class Canvas extends React.Component<CanvasProps, {}> {
  render() {
    return <canvas id="canvas" width="800px" height="500px"></canvas>;
  }
}