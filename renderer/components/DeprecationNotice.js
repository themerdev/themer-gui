import React from 'react';
import { shell } from 'electron';
import qs from 'qs';
import { connect } from 'react-redux';
import { External } from './Icons';
import Emoji from './Emoji';
import css from './DeprecationNotice.css';

const getQueryString = colorSets => qs.stringify(
  {
    colors: colorSets,
    activeColorSet: Object.values(colorSets.dark).filter(Boolean).length ? 'dark' : 'light',
    calculateIntermediaryShades: {
      dark: false,
      light: false,
    }
  },
  { allowDots: true },
);

const DeprecationNotice = ({ colorSets }) => (
  <div className={ css.deprecationNotice }>
    <Emoji emoji="⚠️"/>
    {' '}
    Heads up: this GUI for themer has been deprecated.
    {' '}
    <a onClick={ () => shell.openExternal(`https://themer.mjswensen.com?${getQueryString(colorSets)}`) }>
      Open current theme in the new Web UI
      <External />
    </a>
  </div>
);

const mapStateToProps = state => ({
  colorSets: state.colorSets
});

export default connect(
  mapStateToProps,
)(DeprecationNotice);
