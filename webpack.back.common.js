const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'node',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        exclude: [path.resolve(__dirname, 'node_modules')],
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.graphql?$/,
        use: [
          {
            loader: 'webpack-graphql-loader',
            options: {
              //
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CopyPlugin([
      { from: '.env', to: '.env', toType: 'file' }
    ]),
  ]
};
