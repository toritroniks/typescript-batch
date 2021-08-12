import * as webpack from 'webpack';
import * as path from 'path';
import * as nodeExternals from 'webpack-node-externals';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { getEntries } from '@libs/helpers/webpackHelper';

const config: webpack.Configuration = {
  context: __dirname,
  mode: 'production', // In case of local build this is overriden by the cli --mode option
  entry: getEntries(),
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name]',
    clean: true,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.paths.json',
      }),
    ],
  },
  optimization: {
    concatenateModules: false,
  },
  target: 'node',
  externals: [nodeExternals() as any],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [[path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'dist')]],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $config: [path.resolve(path.join(__dirname, 'src/libs/config')), 'default'],
    }),
  ],
};

export default config;
