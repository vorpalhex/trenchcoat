import { resolve } from 'path';
import semverRegex from 'semver-regex';

import { devDependencies } from './package.json';

const electronVersion = semverRegex().exec(dependencies.electron)[0];

export default {
  context: resolve(__dirname, '..'),
  entry: {
    renderer: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: resolve(__dirname, '../src'),
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
    path: resolve(__dirname, './client/app'),
    filename: '[name].js',
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  target: 'electron-renderer',
};
