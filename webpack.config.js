const path = require('path');
const pack = require('./package');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const inProduction = process.env.NODE_ENV === 'production';
const cssProdLoader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader','sass-loader']
  });
const cssDevLoader = ['style-loader', 'css-loader?sourceMap','sass-loader?sourceMap'];
const cssLoader = inProduction ? cssProdLoader : cssDevLoader;

const title = 'Webpack boilerplate'

let config = {
  context: __dirname,
  entry: {
    app: './src/index.js'
  },
  output: {
    path:  path.join(__dirname, 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map'
  },
  module: {
    rules: [
        {
          test: /\.(scss|css)$/,
          use: cssLoader
        },
        {
          test: /.js$/,
          use: {
            loader: 'babel-loader'
          },
          exclude: /(node_modules)/
      },
      {
        test: /\.(png|jpg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader?limit=8192&name=assets/[hash].[ext]'
        }
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        use: {
          loader: 'file-loader?name=assets/[hash].[ext]'
        }
      }
    ]
  }
}

if (inProduction) {
  config.plugins = [
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: false,
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__DEV__': false,
      VERSION: JSON.stringify(pack.version)
    }),
    new HtmlWebpackPlugin({
      title: title,
      minify: {
        collapseWhitespace: true
      },
      template: './src/index.html'
    }),
  ];
} else {
  config.devtool = 'cheap-module-source-map';
  config.plugins = [
    new HtmlWebpackPlugin({
      title: title + 'develop',
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': true,
      VERSION: JSON.stringify(pack.version)
    })
  ];
  config.devServer: {
    contentBase: '/dist/',
    port: 8080,
    compress: true,
    open: true,
    stats: 'errors-only',
    hot: true
  };
}

module.exports = config;
