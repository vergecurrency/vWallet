const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { spawn } = require('child_process');

// Config directories
const SRC_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
// const defaultInclude = [SRC_DIR]

module.exports = {
  mode: 'production',
  entry: {
    client: SRC_DIR + '/index.tsx',
    vendors: [
      'react',
      'react-dom',
      'mobx',
      'mobx-react',
      'react-router',
      'react-router-dom',
    ],
  },
  output: {
    path: OUTPUT_DIR,
    publicPath: './',
    filename: '[name].[hash:8].js',
    sourceMapFilename: '[name].[hash:8].map',
    chunkFilename: '[id].[hash:8].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.png', '.svg'],
    modules: [path.join(__dirname, 'app'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['awesome-typescript-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]',
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]',
          },
        ],
      },
    ],
  },
  target: 'electron-renderer',
  optimization: {
    minimize: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'async',
      minSize: 1000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'loading.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'status.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  devtool: 'source-map',
  stats: {
    colors: true,
    children: false,
    chunks: true,
    modules: false,
  },
};
