import React from 'react';
import { connect } from 'react-redux';
import { colorChange } from '../actions';
import { getOrDefault, getBestForeground } from '../helpers/color';
import css from './ColorSet.css';
import ColorSetInput from './ColorSetInput';

const ColorSet = ({
  colorSet,
  defaultBackgroundColor,
  defaultForegroundColor,
  className,
  keyPrefix,
  onInputChange
}) => (
  <div
    className={ css.colorSet }
    style={{
      backgroundColor: getOrDefault(colorSet.shade0, defaultBackgroundColor),
    }}
  >
    { Object.entries(colorSet).map(([colorKey, value]) => {
      const isShade = colorKey.includes('shade');
      const foreground = getOrDefault(colorSet.shade7, defaultForegroundColor);
      const background = getOrDefault(colorSet.shade0, defaultBackgroundColor);
      const valueOrForeground = getOrDefault(value, foreground);
      const valueOrBackground = getOrDefault(value, background);
      return (
        <ColorSetInput
          key={ `${keyPrefix}.${colorKey}` }
          colorKey={ colorKey }
          labelColor={ isShade ? foreground : valueOrForeground }
          inputBackgroundColor={ isShade ? valueOrBackground : background }
          inputTextColor={ isShade ? getBestForeground(foreground, background, valueOrBackground) : valueOrForeground }
          inputBorderColor={ valueOrForeground }
          value={ value }
          onChange={ value => onInputChange(colorKey, value) }
        />
      );
    }) }
  </div>
);

const mapStateToProps = (state, { light = false }) => ({
  colorSet: state.colorSets[light ? 'light' : 'dark'],
  defaultBackgroundColor: light ? '#ffffff' : '#000000',
  defaultForegroundColor: light ? '#000000' : '#ffffff',
  keyPrefix: light ? 'light' : 'dark',
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
