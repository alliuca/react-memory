var autoprefixer = require('autoprefixer');
var calc = require('postcss-calc');
var customProperties = require('postcss-custom-properties');
var merge = require('webpack-merge');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const CSSLOADERS = 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss';
const STYLE = (TARGET === 'start' || !TARGET) ? `style!${CSSLOADERS}` : ExtractTextPlugin.extract('style', CSSLOADERS);
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  data: path.join(__dirname, 'app/data')
};

process.env.BABEL_ENV = TARGET;

var common = {
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: STYLE,
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: PATHS.app
      },
      {
        test: /\.svg$/,
        loader: 'file?name=images/[name].[ext]?[hash]',
        include: PATHS.data
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin()
  ],
  postcss: function () {
    return [autoprefixer, customProperties, calc];
  }
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // display only errors to reduce the amount of output
      stats: 'errors-only',

      // parse host and port from env so this is easy
      // to customize
      host: process.env.HOST,
      port: 5555
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}