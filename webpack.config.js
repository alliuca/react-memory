var autoprefixer = require('autoprefixer');
var calc = require('postcss-calc');
var customProperties = require('postcss-custom-properties');
var nested = require('postcss-nested');
var merge = require('webpack-merge');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Clean = require('clean-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const CSSLOADERS = 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss';
const STYLE = (TARGET === 'start' || !TARGET) ? `style!${CSSLOADERS}` : ExtractTextPlugin.extract('style', CSSLOADERS);
const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist'),
  data: path.join(__dirname, 'app/data'),
  normalize: path.join(__dirname, 'node_modules/normalize.css')
};
const pkg = require('./package.json');

process.env.BABEL_ENV = TARGET;

const common = {
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.dist,
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?cacheDirectory',
        include: PATHS.app
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Memory',
      template: 'index.html'
    })
  ],
  postcss: function () {
    return [autoprefixer, customProperties, calc, nested];
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
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: STYLE,
          include: [PATHS.app, PATHS.normalize]
        },
        {
          test: /\.svg$/,
          loader: 'file?name=images/[name].[ext]?[hash]',
          include: PATHS.data
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET === 'build' || TARGET === 'stats') {
  module.exports = merge(common, {
    entry: {
      app: PATHS.app,
      vendor: Object.keys(pkg.dependencies).filter(function(v) {
        return (v !== 'alt-utils' && v !== 'autoprefixer' && v !== 'postcss-calc' && v !== 'postcss-custom-properties' && v !== 'postcss-nested');
      }),
      style: PATHS.app // but still getting style.js, looking into it
    },
    output: {
      paths: PATHS.dist,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: STYLE,
          include: [PATHS.app, PATHS.normalize]
        },
        {
          test: /\.svg$/,
          loaders: [
            'file?name=images/[name].[ext]?[hash]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ],
          include: PATHS.data
        }
      ]
    },
    plugins: [
      new Clean([PATHS.dist]),
      new ExtractTextPlugin('style.[hash].css', {allChunks: true}),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}