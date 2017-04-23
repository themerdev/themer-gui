import React from 'react';
import css from './ColorSetInput.css';

export default ({
  colorKey,
  labelColor,
  inputBackgroundColor,
  inputTextColor,
  inputBorderColor,
  value,
  onChange
}) => (
  <div
    className={ `${css[colorKey]} ${css.colorSetInputWrapper}` }
  >
    <label
      className={ css.colorSetInputLabel }
      style={{ color: labelColor }}
    >{ colorKey }</label>
    <input
      className={ css.colorSetInput }
      style={{
        backgroundColor: inputBackgroundColor,
        color: inputTextColor,
        borderBottomColor: inputBorderColor,
      }}
      value={ value }
      onChange={ evt => onChange(evt.target.value) }
    />
  </div>
);
