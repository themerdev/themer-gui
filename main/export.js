const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const {
  EXPORT_THEMES_REQUEST,
  EXPORT_PROGRESS,
  EXPORT_CANCEL,
  EXPORT_ERROR,
  EXPORT_COMPLETE,
  EXPORT_COLORS_REQUEST,
} = require('../common/ipcevents.js');
const copy = require('recursive-copy');
const os = require('os');
const path = require('path');
const fs = require('pn/fs');
const { format } = require('prettier');
const Color = require('color');
const themer = require('themer').default;

const renderColorSets = (colorSets) => {
  const shouldIncludeDark = Object.values(colorSets.dark).every(Boolean);
  const shouldIncludeLight = Object.values(colorSets.light).every(Boolean);
  const source = [
    'exports.colors = {',
    ...(shouldIncludeDark ? renderColorSet('dark', colorSets.dark) : []),
    ...(shouldIncludeLight ? renderColorSet('light', colorSets.light) : []),
    '};',
  ].join('\n');
  return format(source, { singleQuote: true, trailingComma: 'es5' });
};

const renderColorSet = (colorSetKey, colorSet) => {
  return [
    `${colorSetKey}: {`,
    ...Object.entries(colorSet).map(renderColorSetColor),
    `},`,
  ];
};

const renderColorSetColor = ([ colorKey, color ]) => {
  const formatted = Color(color).hex();
  return `${colorKey}: '${formatted}', ${formatted.toLowerCase() !== color.toLowerCase() ? `// ${color}` : ''}`;
};

exports.bootstrap = () => {

  // Export themes

  ipcMain.on(EXPORT_THEMES_REQUEST, (event, colorSets, exportOptions) => {
    const {
      alfred,
      chrome,
      hyper,
      iterm,
      terminal,
      atomSyntax,
      sublimeText,
      vim,
      vimLightline,
      vsCode,
      xcode,
      wallpaperBlockWave,
      wallpaperOctagon,
      wallpaperTriangles,
      slack,
    } = exportOptions;
    const templates = [
      alfred && 'themer-alfred',
      chrome && 'themer-chrome',
      hyper && 'themer-hyper',
      iterm && 'themer-iterm',
      terminal && 'themer-terminal',
      atomSyntax && 'themer-atom-syntax',
      sublimeText && 'themer-sublime-text',
      vim && 'themer-vim',
      vimLightline && 'themer-vim-lightline',
      vsCode && 'themer-vscode',
      xcode && 'themer-xcode',
      wallpaperBlockWave && 'themer-wallpaper-block-wave',
      wallpaperOctagon && 'themer-wallpaper-octagon',
      wallpaperTriangles && 'themer-wallpaper-triangles',
      slack && 'themer-slack',
    ].filter(Boolean);
    const colorsFileContents = renderColorSets(colorSets);

    const tmpOutputDirName = `themer-${Date.now()}`;
    const tmpOutputDirPath = path.join(os.tmpdir(), tmpOutputDirName);
    const tmpOutputColorsPath = path.join(tmpOutputDirPath, 'colors.js');

    dialog.showSaveDialog(
      BrowserWindow.fromWebContents(event.sender),
      {
        title: 'Choose export location',
        defaultPath: path.join(app.getPath('home'), tmpOutputDirName),
      },
      (userOutputDirPath) => {
        if (userOutputDirPath === undefined) {
          event.sender.send(EXPORT_CANCEL);
        } else {
          fs.mkdir(tmpOutputDirPath)
            .then(() => fs.writeFile(tmpOutputColorsPath, colorsFileContents))
            .then(() => {
              themer(tmpOutputColorsPath, templates, tmpOutputDirPath, {}).subscribe(
                status => event.sender.send(EXPORT_PROGRESS, status),
                err => event.sender.send(EXPORT_ERROR, err.toString()),
                () => {
                  copy(tmpOutputDirPath, userOutputDirPath)
                    .then(() => event.sender.send(EXPORT_COMPLETE, userOutputDirPath))
                    .catch(err => event.sender.send(EXPORT_ERROR, err.toString()));
                }
              );
            })
            .catch(err => event.sender.send(EXPORT_ERROR, err.toString()));
        }
      }
    );
  });

  // Export colors

  ipcMain.on(EXPORT_COLORS_REQUEST, (event, colorSets) => {
    const colorsFileContents = renderColorSets(colorSets);
    dialog.showSaveDialog(
      BrowserWindow.fromWebContents(event.sender),
      {
        title: 'Choose export location',
        defaultPath: path.join(app.getPath('home'), 'colors.js'),
      },
      (userOutputPath) => {
        if (userOutputPath) {
          fs.writeFile(userOutputPath, colorsFileContents);
        }
      }
    );
  });
};
