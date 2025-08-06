import * as React from 'react';
import Canvas from './canvas';
import Controls from './controls';

const App: React.FC = () => {
  return (
    <div className="mw9 center pa4">
      <div className="fl w-70 pa2"><Canvas /></div>
      <div className="fl w-30 pa2"><Controls /></div>
    </div>
  );
};

export default App;