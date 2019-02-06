'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const calc = require('postcss-calc');
const cssVariables = require('postcss-css-variables');
const postcssImport = require('postcss-import');
const customMedia = require('postcss-custom-media');
const cssnano = require('cssnano');

const cssFilename = 'static/css/[name].[contenthash:8].css';
// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = {
  publicPath: Array(cssFilename.split('/').length).join('../')
};

module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: 'source-map',
  entry: [ './src/index.js' ],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/bundle.js',
    publicPath: './'
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
        use: ['babel-loader'],
        include: path.resolve('src')
      },
      // "postcss" loader applies autoprefixer to our CSS
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags
      // unlike in development, `ExtractTextPlugin` first applied "postcss"
      // and "css" loaders, then grabs the result CSS and puts it into a
      // separate file in our build process. This way we ship a single CSS
      // file in production instead of JS code injecting <style> tags.
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
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
                      customMedia,
                      cssVariables,
                      calc,
                      cssnano
                    ]
                  }
                }
              ]
            },
            extractTextPluginOptions
          )
        )
      }
      // end loaders
    ]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
  ]
}
