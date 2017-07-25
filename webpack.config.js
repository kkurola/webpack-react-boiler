const path = require('path');
const pack = require('./package');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const inProduction = process.env.NODE_ENV === 'production';

const cssDevLoader = ['style-loader', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap'];
const cssProdLoader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap']
});

const cssLoader = inProduction ? cssProdLoader : cssDevLoader;
const entry = inProduction ? ['./app/index.js'] : ['webpack-hot-middleware/client', './app/index.js'];

const title = inProduction
    ? 'Webpack boilerplate'
    : 'Webpack boilerplate - Development v' + JSON.stringify(pack.version.substring(1, pack.version.length - 1));

let config = {
    context: __dirname,
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        sourceMapFilename: 'app.map'
    },
    resolve: {
        alias: {
            Assets: path.resolve(__dirname, 'app/assets'),
            Images: path.resolve(__dirname, 'app/assets/images'),
            Actions: path.resolve(__dirname, 'app/actions'),
            Containers: path.resolve(__dirname, 'app/containers'),
            Reducers: path.resolve(__dirname, 'app/reducers')
        },
        extensions: ['.js', '.json']
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
                    loader: 'url-loader?limit=8192&name=assets/[name].[ext]'
                }
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                use: {
                    loader: 'file-loader?name=assets/[name].[ext]'
                }
            }
        ]
    }
};

if (inProduction) {
    config.devtool = 'cheap-module-source-map';
    config.plugins = [
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: title,
            minify: {
                collapseWhitespace: true
            },
            template: './app/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            '__DEV__': false,
            VERSION: JSON.stringify(pack.version)
        })
    ];
} else {
    config.devtool = 'cheap-module-source-map';
    config.plugins = [
        new WriteFilePlugin(),
        new HtmlWebpackPlugin({
            title: title,
            template: './app/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            '__DEV__': true,
            VERSION: JSON.stringify(pack.version)
        })
    ];
}

module.exports = config;
