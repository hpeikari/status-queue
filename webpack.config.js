'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const templateContent = `
  <!DOCTYPE html>
  <html>
    <body>
      <div id="pkg_root"></div>
    </body>
  </html>`;

const htmlPlugin = new HtmlWebpackPlugin({
  templateContent,
  inject: 'body'
});

const copyWebpackPlugin = new CopyWebpackPlugin([
  {
    from: './src/assets', to: './lib/assets'
  }
]);

const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
};

const svgLoader = {
  test: /\.svg$/,
  exclude: /node_modules/,
  loader: 'svg-react-loader'
};

const fileLoader = {
  test: /\.(png|woff|woff2|eot|ttf|svg)$/,
  exclude: /src/,
  loader: 'url-loader',
  options: { limit: 100000 }
};

const styleLoader = sourceMaps => ({
  test: /\.(scss|css)$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: sourceMaps,
          minimize: true,
          modules: true,
          importLoaders: 2,
          localIdentName: '[name]__[local]__[hash:base64:5]'
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: sourceMaps,
          plugins: (loader) => [
              require('autoprefixer')
            ]
        }
      }, {
        loader: 'sass-loader',
        options: { sourceMap: sourceMaps }
      }
    ]
  })
});


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dist/scenarioStatusQueue.min.js',
    libraryTarget: 'umd',
    library: 'ScenarioStatusQueue'
  },
  module: {
    loaders: [
      babelLoader,
      fileLoader,
      svgLoader,
      styleLoader(true)
    ]
  },
  plugins: [
    htmlPlugin,
    copyWebpackPlugin,
    new ExtractTextPlugin('lib/styles/ScenarioStatusQueue.scss'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
