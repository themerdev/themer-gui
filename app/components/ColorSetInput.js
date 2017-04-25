import React from 'react';
import css from './ColorSetInput.css';

export default ({
  colorKey,
  labelColor,
  inputBackgroundColor,
  inputTextColor,
  inputBorderColor,
  inputBorderRadius,
  value,
  onChange
}) => (
  <div
    className={ `${css[colorKey]} ${css.colorSetInputWrapper}` }
  >
    <label
      className={ css.colorSetInputLabel }
      style={{ color: labelColor }}
    >
      { colorKey }
      <input
        className={ css.colorSetInput }
        style={{
          backgroundColor: inputBackgroundColor,
          color: inputTextColor,
          borderBottomColor: inputBorderColor,
          borderRadius: inputBorderRadius,
        }}
        value={ value }
        onChange={ evt => onChange(evt.target.value) }
      />
    </label>
  </div>
);
