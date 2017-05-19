import React from 'react';
import { Check } from './Icons';
import css from './Checkbox.css';

export default ({ value, label, onChange }) => (
  <label className={ css.label }>
    <input
      className={ css.input }
      type="checkbox"
      checked={ value }
      onChange={ evt => onChange(evt.target.checked) }
    />
    <Check
      backgroundColor={ value ? 'black' : 'transparent' }
      outlineColor={ value ? 'transparent' : 'black' }
      checkColor={ value ? 'white' : 'transparent' }
    />
    <span className={ css.labelText }>{ label }</span>
  </label>
);
