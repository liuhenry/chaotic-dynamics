const path = require('path');

module.exports = {
  entry: './src/js/pendulum.ts',
  output: {
    filename: 'pendulum.js',
    path: path.resolve(__dirname, 'dist')
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.js', '.json', '.html']
  },

  module: {
    rules: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

      { test: /\.html$/, loader: 'html-loader' }
    ]
  }
};