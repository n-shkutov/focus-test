const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');

module.exports = {
  cache: {
    type: 'filesystem',
  },
  experiments: {
    asset: true,
  },
  output: {
    filename: '[id].[contenthash].js',
    chunkFilename: '[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    compress: true,
    contentBase: path.join(__dirname, '../dist'),
    port: 3000,
    open: true,
    overlay: true,
    historyApiFallback: { disableDotRule: true },
    noInfo: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
          options: {
            esModule: true,
          },
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: {
              mode: 'local',
              localIdentName: '[local]-[hash:base64:5]',
            },
          },
        }],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
      title: 'Focus Reactive test app',
    }),
    new WebpackBar(),
  ],
};
