import React from 'react';
import css from './ColorSetInput.css';

export default ({ colorKey, labelColor, value, onChange }) => (
  <div
    className={ css[colorKey] }
  >
    <label style={{ color: labelColor }}>{ colorKey }</label>
    <input
      value={ value }
      onChange={ evt => onChange(evt.target.value) }
    />
  </div>
);
