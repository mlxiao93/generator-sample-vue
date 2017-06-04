const webpackMerge = require('webpack-merge');
const base = require('./base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = webpackMerge(base, {
  output: {
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',   //enable srouce map
  devServer: {
    host: '0.0.0.0',
    port: 9000
  },
  plugins: [
    new OpenBrowserPlugin({url: 'http://localhost:9000'})
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, './../src/config/dev.js')
    }
  }
});
