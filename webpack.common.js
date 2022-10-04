const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpack = require("webpack");

module.exports = {
    entry: {
        index: './src/index.js',
        courses: './src/pages/courses.js',
    },
    output: {
        // we added the contenthash to the output bundle
        // because the browser would then get a new bundle name
        // after every change to the bundle which will help browser 
        // cache the new version of bundle by requesting a fresh copy
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                type: "asset/resource",
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            // same as entrypoints in string
            chunks: ["index"],
            // to generate html file separately for these 
            // two different pages we need to define the filename 
            filename: "index.html",

        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/courses.html",
            // to generate html file separately for these 
            // two different pages we need to define the filename 
            chunks: ["courses"],
            filename: "courses.html",
            // to serve the file with base as the path it is served from
            base: "pages",
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            _: "lodash",
        }),
    ],
    // Adding optimization config 
    // this is available out of box only in webpack 5
    optimization: {
        // splits the bundles by dependencies,
        // removing redundant dependencies
        // removing reduncancies into a separate bundle 
        // helps browser cache it once and use it on other
        // pages without downloading it again
        splitChunks: {
            chunks: "all",
        }
    }
}
