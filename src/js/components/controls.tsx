import * as React from 'react';
import { Dispatch, connect } from 'react-redux';
import Slider from 'rc-slider';

import { StoreState } from '../types/index';
import { changeDamping } from '../actions/simulation';

import 'rc-slider/assets/index.css';


interface Props {
  damping: number;
  onDampingChange(value: number): void;
}

class Controls extends React.Component<Props> {
  handleChange(value: number) {
    this.props.onDampingChange(value);
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

function mapStateToProps(state: StoreState) {
  return {
    damping: state.parameters.damping
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onDampingChange(value: number) {
      dispatch(changeDamping(Number(Math.round(Number(value + 'e3')) + 'e-3')));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)