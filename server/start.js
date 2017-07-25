const Server = require('./app.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');

const port = (process.env.port || 8080);
const app = Server.app();

if (process.env.NODE_ENV !== 'production') {
    console.log('Starting Express server in development environment');
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        compress: true,
        hot: true,
        stats: 'errors-only'
        // noInfo: true,
        // errorDetails: true,
    }));
    app.use(webpackHotMiddleware(compiler));
} else {
    console.log('Starting Express server in production environment');
}

app.listen(port);
console.log(`Listening at localhost:${port}`);
