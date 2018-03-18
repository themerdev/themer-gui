import React from 'react';
import { EXPORT_THEMES_REQUEST } from '../../common/ipcevents';
import { connect } from 'react-redux';
import { ipcRenderer, shell } from 'electron';
import Checkbox from './Checkbox';
import { External } from './Icons';
import Button from './Button';
import {
  closeDialogs,
  setExportOption,
  exportProgressDialogOpen,
} from '../actions';
import { optionName } from '../helpers/options';
import css from './FormDialogs.css';

const ExportDialog = ({
  alfred,
  chrome,
  hyper,
  iterm,
  terminal,
  atomSyntax,
  atomUi,
  sublimeText,
  vim,
  vimLightline,
  vsCode,
  xcode,
  bbEdit,
  conEmu,
  wallpaperBlockWave,
  wallpaperOctagon,
  wallpaperTriangles,
  slack,
  cmd,
  jetBrains,
  sketchPalettes,
  tmux,
  anySelected,
  colorSets,
  setOption,
  onCancel,
  onExport,
}) => (
  <div className={ css.container }>
    <p>Select with themes you'd like to export:</p>
    <form>
      <fieldset>
        <legend>Terminals</legend>
        <Checkbox
          value={ hyper }
          label={ optionName('hyper') }
          onChange={ val => setOption('hyper', val) }
        />
        <Checkbox
          value={ iterm }
          label={ optionName('iterm') }
          onChange={ val => setOption('iterm', val) }
        />
        <Checkbox
          value={ terminal }
          label={ optionName('terminal') }
          onChange={ val => setOption('terminal', val) }
          disabled={ process.platform !== 'darwin' }
        />
        <Checkbox
          value={ conEmu }
          label={ optionName('conEmu') }
          onChange={ val => setOption('conEmu', val) }
        />
        <Checkbox
          value={ cmd }
          label={ optionName('cmd') }
          onChange={ val => setOption('cmd', val) }
        />
      </fieldset>
      <fieldset>
        <legend>Editors</legend>
        <Checkbox
          value={ atomSyntax }
          label={ optionName('atomSyntax') }
          onChange={ val => setOption('atomSyntax', val) }
        />
        <Checkbox
          value={ atomUi }
          label={ optionName('atomUi') }
          onChange={ val => setOption('atomUi', val) }
        />
        <Checkbox
          value={ sublimeText }
          label={ optionName('sublimeText') }
          onChange={ val => setOption('sublimeText', val) }
        />
        <Checkbox
          value={ vim }
          label={ optionName('vim') }
          onChange={ val => setOption('vim', val) }
        />
        <Checkbox
          value={ vimLightline }
          label={ optionName('vimLightline') }
          onChange={ val => setOption('vimLightline', val) }
        />
        <Checkbox
          value={ vsCode }
          label={ optionName('vsCode') }
          onChange={ val => setOption('vsCode', val) }
        />
        <Checkbox
          value={ xcode }
          label={ optionName('xcode') }
          onChange={ val => setOption('xcode', val) }
        />
        <Checkbox
          value={ bbEdit }
          label={ optionName('bbEdit') }
          onChange={ val => setOption('bbEdit', val) }
        />
        <Checkbox
          value={ jetBrains }
          label={ optionName('jetBrains') }
          onChange={ val => setOption('jetBrains', val) }
        />
      </fieldset>
      <fieldset>
        <legend>Wallpaper</legend>
        <Checkbox
          value={ wallpaperBlockWave }
          label="“Block Wave”"
          onChange={ val => setOption('wallpaperBlockWave', val) }
        />
        <Checkbox
          value={ wallpaperOctagon }
          label="“Octagon”"
          onChange={ val => setOption('wallpaperOctagon', val) }
        />
        <Checkbox
          value={ wallpaperTriangles }
          label="“Triangles”"
          onChange={ val => setOption('wallpaperTriangles', val) }
        />
      </fieldset>
      <fieldset>
        <legend>Other</legend>
        <Checkbox
          value={ slack }
          label={ optionName('slack') }
          onChange={ val => setOption('slack', val) }
        />
        <Checkbox
          value={ alfred }
          label={ optionName('alfred') }
          onChange={ val => setOption('alfred', val) }
        />
        <Checkbox
          value={ chrome }
          label={ optionName('chrome') }
          onChange={ val => setOption('chrome', val) }
        />
        <Checkbox
          value={ sketchPalettes }
          label={ optionName('sketchPalettes') }
          onChange={ val => setOption('sketchPalettes', val) }
        />
        <Checkbox
          value={ tmux }
          label={ optionName('tmux') }
          onChange={ val => setOption('tmux', val) }
        />
      </fieldset>
    </form>
    <Button
      plain
      noSpace
      onClick={ () => shell.openExternal('https://github.com/mjswensen/themer/issues/new') }
    >
      Request other theme templates
      <External />
    </Button>
    <div className={ css.footer }>
      <Button
        onClick={() => onCancel()}
      >Cancel</Button>
      <Button
        primary
        onClick={() => onExport(colorSets, {
          alfred,
          chrome,
          hyper,
          iterm,
          terminal,
          atomSyntax,
          atomUi,
          sublimeText,
          vim,
          vimLightline,
          vsCode,
          xcode,
          bbEdit,
          conEmu,
          wallpaperBlockWave,
          wallpaperOctagon,
          wallpaperTriangles,
          slack,
          cmd,
          jetBrains,
          sketchPalettes,
          tmux,
        })}
        disabled={!anySelected}
      >Export</Button>
    </div>
  </div>
);

const mapStateToProps = state => ({
  ...state.exportOptions,
  anySelected: Object.values(state.exportOptions).some(v => v),
  colorSets: state.colorSets,
});
const mapDispatchToProps = dispatch => ({
  setOption: (option, value) => {
    dispatch(setExportOption(option, value));
  },
  onCancel: () => {
    dispatch(closeDialogs());
  },
  onExport: (colorSets, exportOptions) => {
    dispatch(closeDialogs());
    ipcRenderer.send(EXPORT_THEMES_REQUEST, colorSets, exportOptions);
    dispatch(exportProgressDialogOpen());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportDialog);
