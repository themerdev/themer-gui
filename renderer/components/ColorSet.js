import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { colorChange, focusModeToggle } from '../actions';
import { getOrDefault, getBestForeground } from '../helpers/color';
import css from './ColorSet.css';
import ColorSetInput from './ColorSetInput';
import { Contract, Expand } from './Icons';

const ColorSet = ({
  colorSet,
  defaultBackgroundColor,
  defaultForegroundColor,
  className,
  keyPrefix,
  isFocusMode,
  onInputChange,
  onFocusModeToggle,
}) => {
  const foreground = getOrDefault(colorSet.shade7, defaultForegroundColor);
  const background = getOrDefault(colorSet.shade0, defaultBackgroundColor);
  return (
    <div
      className={ classnames(css.colorSetWrapper, { [css.focusMode]: isFocusMode }) }
      style={{
        backgroundColor: background,
      }}
    >
      <div className={ css.colorSet }>
        { Object.entries(colorSet).map(([colorKey, value]) => {
          const isShade = colorKey.includes('shade');
          const valueOrForeground = getOrDefault(value, foreground);
          const valueOrBackground = getOrDefault(value, background);
          return (
            <ColorSetInput
              key={ `${keyPrefix}.${colorKey}` }
              colorKey={ colorKey }
              labelColor={ isShade ? foreground : valueOrForeground }
              inputBackgroundColor={ isShade ? valueOrBackground : background }
              inputTextColor={ isShade ? getBestForeground(foreground, background, valueOrBackground) : valueOrForeground }
              inputBorderColor={ isShade ? 'transparent' : getOrDefault(value, 'transparent') }
              inputBorderRadius={ isShade ? '2px' : 'none' }
              textInputValue={ value }
              colorInputValue={ isShade ? valueOrBackground : valueOrForeground }
              onChange={ value => onInputChange(colorKey, value) }
            />
          );
        }) }
      </div>
      <button
        className={ css.focusModeToggle }
        style={{ color: foreground }}
        onClick={ onFocusModeToggle }
      >
        { isFocusMode ? (<Contract />) : (<Expand />) }
      </button>
    </div>
  );
};

const mapStateToProps = (state, { light = false }) => ({
  colorSet: state.colorSets[light ? 'light' : 'dark'],
  defaultBackgroundColor: light ? '#ffffff' : '#000000',
  defaultForegroundColor: light ? '#000000' : '#ffffff',
  keyPrefix: light ? 'light' : 'dark',
  isFocusMode: state.focusMode[light ? 'light' : 'dark'],
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
  onFocusModeToggle: () => {
    dispatch(focusModeToggle(light));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorSet);
