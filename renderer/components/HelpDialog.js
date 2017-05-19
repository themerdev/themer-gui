import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import { Droplet } from './Icons';
import { closeDialogs } from '../actions';
import css from './HelpDialog.css';

const HelpDialog = ({ onClose }) => (
  <div className={ css.help }>
    <p>Define your theme&rsquo;s colors by typing any valid CSS color format, or use the color picker by clicking the droplet icon (<Droplet style={{ verticalAlign: 'bottom' }} />).</p>
    <p>Your theme can define a dark color set, a light color set, or both. Here is how the colors are typcally used in outputted themes:</p>
    <table className={ css.table }>
      <tbody>
        <tr>
          <td>shade0: background color</td>
          <td>accent0: error, vcs deletion</td>
        </tr>
        <tr>
          <td>shade1: UI</td>
          <td>accent1: syntax</td>
        </tr>
        <tr>
          <td>shade2: UI, text selection</td>
          <td>accent2: warning, vcs modification</td>
        </tr>
        <tr>
          <td>shade3: UI, code comments</td>
          <td>accent3: success, vcs addition</td>
        </tr>
        <tr>
          <td>shade4: UI</td>
          <td>accent4: syntax</td>
        </tr>
        <tr>
          <td>shade5: UI</td>
          <td>accent5: syntax</td>
        </tr>
        <tr>
          <td>shade6: foreground text</td>
          <td>accent6: syntax, caret/cursor</td>
        </tr>
        <tr>
          <td>shade7: foreground text</td>
          <td>accent7: syntax, special</td>
        </tr>
      </tbody>
    </table>
    <p>The bottom line: <strong>accent0-7 should be the main accent colors of your theme. shade0-7 should be shades of a similar hue.</strong></p>
    <div className={ css.footer }>
      <Button
        primary
        onClick={ onClose }
      >Got it</Button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(closeDialogs());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(HelpDialog);
