const path = require('path');
const semverRegex = require('semver-regex');
const package = require('./package.json');

const electronVersion = semverRegex().exec(package.dependencies.electron)[0];

module.exports = {
  context: path.resolve(__dirname, '.'),
  entry: {
    renderer: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['env', { targets: { electron: electronVersion }, modules: false }],
            'stage-2',
            'react',
          ],
        },
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, './client/app'),
    filename: '[name].js',
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  target: 'electron-renderer',
};
