export const options = {
  hyper: {
    name: 'Hyper',
    instructionsUrl: 'https://github.com/mjswensen/themer-hyper#output',
  },
  iterm: {
    name: 'iTerm',
    instructionsUrl: 'https://github.com/mjswensen/themer-iterm#output',
  },
  terminal: {
    name: `Terminal.app${process.platform === 'darwin' ? '' : ' (macOS only)'}`,
    instructionsUrl: 'https://github.com/mjswensen/themer-terminal#output',
  },
  atomSyntax: {
    name: 'Atom syntax',
    instructionsUrl: 'https://github.com/mjswensen/themer-atom-syntax#output',
  },
  sublimeText: {
    name: 'Sublime Text',
    instructionsUrl: 'https://github.com/mjswensen/themer-sublime-text#output',
  },
  vim: {
    name: 'Vim',
    instructionsUrl: 'https://github.com/mjswensen/themer-vim#output',
  },
  vimLightline: {
    name: 'Vim lightline',
    instructionsUrl: 'https://github.com/mjswensen/themer-vim-lightline#output',
  },
  vsCode: {
    name: 'VS Code',
    instructionsUrl: 'https://github.com/mjswensen/themer-vscode#output',
  },
  slack: {
    name: 'Slack sidebar',
    instructionsUrl: 'https://github.com/mjswensen/themer-slack#output',
  },
  conEmu: {
    name: 'ConEmu',
    instructionsUrl: 'https://github.com/mjswensen/themer-conemu#output',
  },
  cmd: {
    name: 'CMD.exe',
    instructionsUrl: 'https://github.com/mjswensen/themer-cmd#output',
  },
  atomUi: {
    name: 'Atom UI',
    instructionsUrl: 'https://github.com/mjswensen/themer-atom-ui#output',
  },
  xcode: {
    name: 'Xcode',
    instructionsUrl: 'https://github.com/mjswensen/themer-xcode#output',
  },
  bbEdit: {
    name: 'BBEdit',
    instructionsUrl: 'https://github.com/mjswensen/themer-bbedit#output',
  },
  alfred: {
    name: 'Alfred.app',
    instructionsUrl: 'https://github.com/mjswensen/themer-alfred#output',
  },
  chrome: {
    name: 'Chrome',
    instructionsUrl: 'https://github.com/mjswensen/themer-chrome#output',
  },
};

export const optionName = key => options[key].name;
export const optionInstructionsUrl = key => options[key].instructionsUrl;
