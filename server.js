var url = require('url');
var express = require('express');

var webpack = require("webpack");
var webpackMiddleware = require("webpack-dev-middleware");
var webpackConfig = require('./webpack.config');
var proxy = require('proxy-middleware');

var port = process.env.PORT || 3000;

var app = express();

// Static
app.use("/index.html", express.static(process.cwd() + '/index.html'));
app.use('/doc', express.static(process.cwd() + '/doc'));
app.use('/web', express.static(process.cwd() + '/web'));
app.use('/bower_components', express.static(process.cwd() + '/bower_components'));

// Webpack
app.use(webpackMiddleware(webpack(webpackConfig), {
    publicPath: "/assets/"
}));

// IPFS
app.use('/ipfs', proxy(url.parse('https://gateway.ipfs.io/ipfs/')));


app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});