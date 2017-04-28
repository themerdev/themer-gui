import React from 'react';
import classnames from 'classnames';
import css from './ColorSetInput.css';
import { Droplet } from './Icons';

export default ({
  colorKey,
  labelColor,
  inputBackgroundColor,
  inputTextColor,
  inputBorderColor,
  inputBorderRadius,
  textInputValue,
  colorInputValue,
  onChange,
}) => (
  <div
    className={ classnames(css[colorKey], css.wrapper) }
  >
    <label
      className={ css.textInputLabel }
      style={{ color: labelColor }}
    >
      { colorKey }
      <input
        className={ css.textInput }
        style={{
          backgroundColor: inputBackgroundColor,
          color: inputTextColor,
          borderBottomColor: inputBorderColor,
          borderRadius: inputBorderRadius,
        }}
        value={ textInputValue }
        onChange={ evt => onChange(evt.target.value) }
      />
    </label>
    <label
      className={ css.colorInputLabel }
      style={{ color: inputTextColor }}
    >
      <Droplet />
      <input
        className={ css.colorInput }
        type="color"
        tabIndex="-1"
        value={ colorInputValue }
        onChange={ evt => onChange(evt.target.value) }
      />
    </label>
  </div>
);
