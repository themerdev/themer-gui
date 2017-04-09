const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

  entry: './app/index',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'app'),
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            "react",
            [
              "env",
              {
                targets: {
                  electron: true,
                },
              },
            ],
          ],
        },
      },
    ],
  },

  target: 'electron-renderer',

  plugins: [ new HtmlWebpackPlugin() ],

};
