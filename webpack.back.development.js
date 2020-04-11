const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const common = require('./webpack.back.common.js');

module.exports = merge.smart(common, {
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false  // and __filename return blank or /
  },
  devtool: 'inline-source-map',
  entry: [
      'webpack/hot/poll?1000',
      path.join(__dirname, 'server/server.ts')
  ],
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  mode: 'development',
  cache: false,
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // include specific files based on a RegExp
      include: /dist/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })
  ],
  watch: true
});
