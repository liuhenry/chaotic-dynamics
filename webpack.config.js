const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  entry: './src/js/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/assets/js/')
  },

  devtool: 'source-map',

  devServer: {
    contentBase: './dist'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.html']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'awesome-typescript-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      { test: /\.html$/, loader: 'html-loader' }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
};
