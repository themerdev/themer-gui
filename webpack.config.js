const HtmlWebpackPlugin = require('html-webpack-plugin');
const os = require('os');
const path = require('path');

module.exports = {

  entry: './renderer/index',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'renderer'),
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
          plugins: ['transform-object-rest-spread'],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.ttf$/,
        include: [
          path.resolve(__dirname, 'renderer', 'assets'),
        ],
        loader: 'file-loader',
      },
    ],
  },

  target: 'electron-renderer',

  plugins: [ new HtmlWebpackPlugin({
    title: 'Themer',
  }) ],

};
