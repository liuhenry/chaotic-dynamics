import * as React from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';

import { changeDamping } from '../actions/simulation';

import 'rc-slider/assets/index.css';


class Controls extends React.Component {
  handleChange(value: number) {
    this.props.dispatch(changeDamping(Number(Math.round(Number(value + 'e3')) + 'e-3')));
  }

  render() {
    const { damping } = this.props;
    return (
      <div>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={damping}
          marks={{0: 'No Damping'}}
          onChange={this.handleChange.bind(this)}
        />
        {damping}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {damping: state.parameters.damping};
}

export default connect(mapStateToProps)(Controls)