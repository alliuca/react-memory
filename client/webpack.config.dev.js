'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const calc = require('postcss-calc');
const customProperties = require('postcss-custom-properties');
const nested = require('postcss-nested');
const postcssImport = require('postcss-import');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    // Activate HMR for React
    'react-hot-loader/patch',
    // Bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:3000',
    // Bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    // Not used in dev but WebpackDevServer crashes without it:
    path: path.resolve(__dirname, 'build'),
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    filename: 'bundle.js',
    // App is served from "/" in development
    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  module: {
    rules: [
      // First, run the linter (important: before Babel processes the JS)
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre', // ???
        use: [{
          loader: 'eslint-loader'
        }],
        include: path.resolve('src')
      },
      // ** ADDING/UPDATING LOADERS **
      // The "url" loader handles all assets unless explicitly excluded.
      // The `exclude` list *must* be updated with every change to loader extensions.
      // When adding a new loader, you must add its `test`
      // as a new entry in the `exclude` list for "url" loader.

      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `build` folder.
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.svg$/
        ],
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        }
      },
      // Process JS with Babel
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }],
        include: path.resolve('src')
      },
      // "postcss" loader applies autoprefixer to our CSS
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              import: false,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                postcssImport,
                autoprefixer({
                  browsers: [ '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9' ]
                }),
                customProperties,
                calc,
                nested
              ]
            }
          }
        ],
        include: [path.resolve('src')]
      }
      // end loaders
    ]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('public/index.html'),
    }),
    // Makes some env variables available to the JS code
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    compress: true,
    host: 'localhost',
    port: 3000,
    // respond to 404s with index.html
    historyApiFallback: true,
    // Enable HMR on the server
    hot: true,
    publicPath: '/'
  }
}