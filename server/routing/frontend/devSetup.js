const express = require("express");
const webpack = require('webpack');
const historyApiFallback = require("connect-history-api-fallback");
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require("./webpackConfig/webpack.dev.babel");

const compiler = webpack(webpackConfig);
const middleware = webpackDevMiddleware(compiler, {
    logLevel: 'warn',
    publicPath: "/",
    silent: true,
    stats: 'errors-only',
});

module.exports = () => {
    const router = express.Router();
    
    router.use(historyApiFallback({
        verbose: false
    }));
    router.use(middleware);
    router.use(webpackHotMiddleware(compiler));

    return router;
}