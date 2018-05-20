import * as React from 'react';
import Slider from 'react-rangeslider';

import 'react-rangeslider/lib/index.css'

export default class Controls extends React.Component {
  state: {
    value: number;
  }

  constructor(props: {}, context: {}) {
    super(props, context);
    this.state = {
      value: 0
    }
  }

  handleChange(value: number) {
    this.setState({value: Number(Math.round(Number(value + 'e2')) + 'e-2')});
  }

  render() {
    const { value } = this.state;

    return (
      <div>
        <Slider
          min={0}
          max={1}
          step={0.1}
          tooltip={false}
          value={value}
          onChange={this.handleChange.bind(this)}
        />
        {value}
      </div>
    );
  }
}