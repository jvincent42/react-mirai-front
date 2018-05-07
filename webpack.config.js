const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');


const commonConfig = {
  resolve: {
    alias: {
      utils: resolve(__dirname, 'src/App/utils'),
      components: resolve(__dirname, 'src/App/components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};


const clientConfig = Object.assign({}, {
  mode: process.env.NODE_ENV,
  entry: './src/client/index.js',
  target: 'web',
  output: {
    filename: 'js/bundle.js',
    path: resolve(__dirname, 'dist/public'), // TODO: variable for dists
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: resolve(__dirname, 'public/assets'), to: resolve(__dirname, 'dist/public/assets') },
    ]),
    new HtmlWebpackPlugin({
      title: 'React Mirai',
      filename: resolve(__dirname, 'dist/public', 'index.html'), // TODO: variable for dists
      template: resolve(__dirname, 'src', 'index.ejs'), // TODO: move file
      inject: true,
      hash: true,
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, 'public'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    publicPath: '/',
  },
}, commonConfig);

const serverConfig = Object.assign({}, {
  mode: process.env.NODE_ENV,
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'dist/server'),
  },
}, commonConfig);

module.exports = process.env.NODE_ENV === 'development'
  ? [clientConfig]
  : [clientConfig, serverConfig];
