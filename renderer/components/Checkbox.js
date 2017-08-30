import React from 'react';
import classnames from 'classnames';
import { Check } from './Icons';
import css from './InlineInput.css';

export default ({ value, label, onChange, disabled }) => (
  <label className={ classnames(css.label, { [css.disabled]: disabled }) }>
    <input
      className={ css.input }
      type="checkbox"
      checked={ value }
      onChange={ evt => onChange(evt.target.checked) }
      disabled={ disabled }
    />
    <Check
      backgroundColor={ value ? 'currentColor' : 'transparent' }
      outlineColor={ value ? 'transparent' : 'currentColor' }
      checkColor={ value ? 'white' : 'transparent' }
    />
    <span className={ css.labelText }>{ label }</span>
  </label>
);
