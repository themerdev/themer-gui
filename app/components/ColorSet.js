import React from 'react';
import { connect } from 'react-redux';
import { colorChange } from '../actions';
import css from './ColorSet.css';

const ColorSet = ({ light = false, colorSet, onInputChange }) => (
  <div className={ css.colorSet }>
    { Object.entries(colorSet).map(([colorKey, value]) => (
      <div
        key={ `${light ? 'light' : 'dark'}.${colorKey}` }
        className={ css.inputWrapper }
      >
        <input
          value={ value }
          onChange={ evt => onInputChange(colorKey, evt.target.value) }
        />
      </div>
    )) }
  </div>
);

const mapStateToProps = (state, { light }) => ({
  colorSet: state.colorSets[light ? 'light' : 'dark'],
});
const mapDispatchToProps = (dispatch, { light }) => ({
  onInputChange: (colorKey, value) => {
    dispatch(
      colorChange(
        light ? 'light' : 'dark',
        colorKey,
        value,
      )
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorSet);
