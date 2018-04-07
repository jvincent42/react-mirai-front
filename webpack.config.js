const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    filename: 'js/bundle.js',
    path: resolve('public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'React Mirai',
      filename: resolve('public', 'index.html'),
      template: resolve('src', 'index.ejs'),
      inject: true,
      hash: true,
    }),
  ],
  devServer: {
    contentBase: resolve('public'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    publicPath: '/',
  },
};
