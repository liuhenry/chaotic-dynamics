import * as React from 'react';
import Canvas from './canvas';
import Controls from './controls';


export default class App extends React.Component {
  render() {
    return (
      <div>
        <Canvas />
        <Controls />
      </div>
    );
  }
}