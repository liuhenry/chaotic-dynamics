import * as React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-rangeslider';

import { changeDamping } from '../actions/simulation';

import 'react-rangeslider/lib/index.css'


class Controls extends React.Component {
  handleChange(value: number) {
    this.props.dispatch(changeDamping(Number(Math.round(Number(value + 'e2')) + 'e-2')));
  }

  render() {
    const { damping } = this.props;
    return (
      <div>
        <Slider
          min={0}
          max={1}
          step={0.1}
          tooltip={false}
          value={damping}
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