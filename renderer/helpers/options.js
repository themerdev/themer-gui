export const options = {
  hyper: {
    name: 'Hyper',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-hyper#output',
  },
  iterm: {
    name: 'iTerm',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-iterm#output',
  },
  terminal: {
    name: `Terminal.app${process.platform === 'darwin' ? '' : ' (macOS only)'}`,
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-terminal#output',
  },
  atomSyntax: {
    name: 'Atom syntax',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-atom-syntax#output',
  },
  sublimeText: {
    name: 'Sublime Text',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-sublime-text#output',
  },
  vim: {
    name: 'Vim',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-vim#output',
  },
  vimLightline: {
    name: 'Vim lightline',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-vim-lightline#output',
  },
  vsCode: {
    name: 'VS Code',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-vscode#output',
  },
  slack: {
    name: 'Slack sidebar',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-slack#output',
  },
  conEmu: {
    name: 'ConEmu',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-conemu#output',
  },
  cmd: {
    name: 'CMD.exe',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-cmd#output',
  },
  atomUi: {
    name: 'Atom UI',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-atom-ui#output',
  },
  xcode: {
    name: 'Xcode',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-xcode#output',
  },
  bbEdit: {
    name: 'BBEdit',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-bbedit#output',
  },
  alfred: {
    name: 'Alfred.app',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-alfred#output',
  },
  chrome: {
    name: 'Chrome',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-chrome#output',
  },
  jetBrains: {
    name: 'JetBrains',
    instructionsUrl: 'https://github.com/tomselvi/themer-jetbrains#output',
  },
  sketchPalettes: {
    name: 'Sketch palettes',
    instructionsUrl: 'https://github.com/mjswensen/themer/tree/master/packages/themer-sketch-palettes#output',
  },
  tmux: {
    name: 'tmux',
    instructionsUrl: 'https://github.com/tomselvi/themer-tmux#output',
  },
  kitty: {
    name: 'kitty',
    instructionsUrl: 'https://github.com/0x52a1/themer-kitty#output',
  },
};

export const optionName = key => options[key].name;
export const optionInstructionsUrl = key => options[key].instructionsUrl;
