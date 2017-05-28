import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import Radio from './Radio';
import {
  closeDialogs,
  prefillColorSetSelectionChange,
  prefillWithColorSet,
} from '../actions';
import { colors as colorsDefault } from 'themer-colors-default';
import { colors as colorsNightSky } from 'themer-colors-night-sky';
import { colors as colorsOne } from 'themer-colors-one';
import css from './FormDialogs.css';

const PrefillDialog = ({ prefillColorSetSelection, onClose, onPrefillColorSetSelect, onPrefillWithColorSet }) => (
  <div className={ css.container }>
    <p>Warning: prefilling with a built-in color set will overwrite any existing colors.</p>
    <form>
      <fieldset>
        <legend>Built-in Color Sets</legend>
        <Radio
          value="themer-colors-default"
          label="Default"
          selected={ prefillColorSetSelection === 'themer-colors-default' }
          onSelect={ onPrefillColorSetSelect }
        />
        <Radio
          value="themer-colors-night-sky"
          label="Night Sky"
          selected={ prefillColorSetSelection === 'themer-colors-night-sky' }
          onSelect={ onPrefillColorSetSelect }
        />
        <Radio
          value="themer-colors-one"
          label="One"
          selected={ prefillColorSetSelection === 'themer-colors-one' }
          onSelect={ onPrefillColorSetSelect }
        />
      </fieldset>
    </form>
    <div className={ css.footer }>
      <Button onClick={ onClose }>Cancel</Button>
      <Button
        primary
        disabled={ !prefillColorSetSelection }
        onClick={ () => onPrefillWithColorSet(prefillColorSetSelection) }
      >Prefill</Button>
    </div>
  </div>
);

const mapStateToProps = state => ({
  prefillColorSetSelection: state.prefillColorSetSelection,
});
const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(closeDialogs());
  },
  onPrefillColorSetSelect: (selection) => {
    dispatch(prefillColorSetSelectionChange(selection));
  },
  onPrefillWithColorSet: (selection) => {
    switch (selection) {
      case 'themer-colors-default':
        dispatch(prefillWithColorSet(colorsDefault));
        break;
      case 'themer-colors-night-sky':
        dispatch(prefillWithColorSet(colorsNightSky));
        break;
      case 'themer-colors-one':
        dispatch(prefillWithColorSet(colorsOne));
        break;
      default:
        dispatch(prefillWithColorSet(colorsDefault));
        break;
    }
    dispatch(closeDialogs());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrefillDialog);
