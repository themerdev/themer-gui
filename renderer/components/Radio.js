import React from 'react';
import { Radio } from './Icons';
import css from './InlineInput.css';

export default ({ value, label, selected, onSelect }) => (
  <label className={ css.label }>
    <input
      className={ css.input }
      type="radio"
      checked={ selected }
      onChange={ () => onSelect(value) }
    />
    <Radio selected={ selected } />
    <span className={ css.labelText }>{ label }</span>
  </label>
);
