const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: './src/index.js',
        courses: './src/index.js',
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
            }
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
        })
    ]
}