const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
        }),
        new CopyWebpackPlugin({
            
            patterns:[
                {
                    // what are the files to be copied in regex create new
                    //  folders in src to handle different types of assets
                    from: path.resolve(__dirname,"src/assets/images/*"),
                    // to which root folder we need to copy these files to 
                    // it creates the rest of the folders on the path by default
                    to: path.resolve(__dirname,"dist"),
                    // context is used to determine from which root folder we need to
                    // copying if we dont specify src it will create folders starting from src
                    // treating the outermost folder as root
                    context: "src",
                }
            ]
        })
    ]
}