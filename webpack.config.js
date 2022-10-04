const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
    entry: {
        index: './src/index.js',
        courses: './src/pages/courses.js',
    },
    output: {
        filename: '[name].bundle.js',
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
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ca]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
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