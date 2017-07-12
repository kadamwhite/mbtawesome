const { resolve } = require('path');
const webpack = require('webpack');
const findCacheDir = require('find-cache-dir');
const objectHash = require('node-object-hash');

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');


const hardSourceCacheDir = findCacheDir({
  // Render into node_modules/.cache/hard-source/[confighash]/...
  name: 'hard-source/[confighash]',
});

module.exports = {
  devtool: 'cheap-module-source-map',

  context: resolve(__dirname, 'public'),

  entry: {
    app: './js/client.js',
  },

  output: {
    // the output bundle
    filename: '[name].min.js',

    path: resolve(__dirname, 'public'),

    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/',
  },

  module: {
    rules: [
      // {
      //   test: /\.js?$/,
      //   use: [
      //     // Check code for lint errors as it is consumed
      //     {
      //       loader: 'eslint-loader',
      //       options: {
      //         // emit all errors as warnings: this lets us see all issues in the
      //         // dev console, but the presence of errors will not block rebuilds
      //         emitWarning: true,
      //       },
      //     },
      //   ],
      //   exclude: /node_modules/,
      // },
      {
        test: /\.tmpl$/,
        use: [
          {
            loader: 'combyne-loader',
            options: {
              root: resolve(__dirname, 'views'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
                sourceMap: true,
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              // See postcss.config.js for other options
              options: {
                sourceMap: true,
              },
            },
            'stylus-loader',
          ],
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'raw-loader',
          // {
          //   loader: 'url-loader',
          //   options: {
          //     limit: 10000,
          //   },
          // },
        ],
      },
    ],
  },

  plugins: [
    // // enable HMR globally
    // new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Use hard source caching for faster rebuilds
    new HardSourceWebpackPlugin({
      cacheDirectory: hardSourceCacheDir,
      recordsPath: resolve(hardSourceCacheDir, 'records.json'),

      // Build a string value used by HardSource to determine which cache to
      // use if [confighash] is in cacheDirectory, or if the cache should be
      // replaced if [confighash] does not appear in cacheDirectory.
      configHash: webpackConfig => objectHash().hash(webpackConfig),
    }),

    // Extract CSS file
    new ExtractTextPlugin('[name].min.css'),

    // Minify with UglifyJS
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),

    // Webpack 3 Scope Hoisting optimization
    new webpack.optimize.ModuleConcatenationPlugin(),

    // Easily visualize bundle stats (output at public/stats.html)
    new VisualizerPlugin(),
  ],

};
