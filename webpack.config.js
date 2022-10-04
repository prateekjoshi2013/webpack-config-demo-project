const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
    // dev server will serve the files from this folder
    devServer: {
        static: "./dist"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ca]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
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
        new CopyWebpackPlugin({

            patterns: [
                {
                    // what are the files to be copied in regex create new
                    //  folders in src to handle different types of assets
                    from: path.resolve(__dirname, "src/assets/images/*"),
                    // to which root folder we need to copy these files to 
                    // it creates the rest of the folders on the path by default
                    to: path.resolve(__dirname, "dist"),
                    // context is used to determine from which root folder we need to
                    // copying if we dont specify src it will create folders starting from src
                    // treating the outermost folder as root
                    context: "src",
                }
            ]
        }),
        // Bundle Analyzer shows a nice ui of all the bundles we generate
        // it shows the size of the dependencies in the bundle 
        // which we can optimize by extracting common dependencies into
        // a separate bundle this reduces overall bundle size by avoiding repetition 
        // it also helps to import these dependencies dynamically when required
        new BundleAnalyzerPlugin({

        }),
        // its better to extract css out of html because 
        // that will cause only css or html to be fetched 
        // in case of changes independent of the other
        // this means the style-loader which was injecting 
        // css as inline styles needs to be replaced by the 
        // loader provided by the MiniCssExtractPlugin which 
        // will help keep css and html separate
        // we will have to change the loaders section for this 
        new MiniCssExtractPlugin(),
        /* Shimming is the concept of binding a symbol to the library 
         * without explicitly binding it through imports
         * the library name should match the one in package.json
         */
        new webpack.ProvidePlugin({
            $: "jquery",
            _: "lodash",
        })
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

// for big projects we can further optimize css files by removing unused css 
// we can remove this unused css using purgecss-webpack-plugin and glob
// glob is  ahelper library which purgecss plugin uses to scan folders