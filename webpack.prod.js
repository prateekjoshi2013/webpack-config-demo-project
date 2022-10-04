const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const glob = require("glob");

const purgePath = { src: path.join(__dirname, "src") };

module.exports = {
    // build mode for this webpackconfig
    mode: "production",
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
        ]
    },
    plugins: [
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
        // its better to extract css out of html because 
        // that will cause only css or html to be fetched 
        // in case of changes independent of the other
        // this means the style-loader which was injecting 
        // css as inline styles needs to be replaced by the 
        // loader provided by the MiniCssExtractPlugin which 
        // will help keep css and html separate
        // we will have to change the loaders section for this 
        new MiniCssExtractPlugin(),
        // for big projects we can further optimize css files by removing unused css 
        // we can remove this unused css using purgecss-webpack-plugin and glob
        // glob is  ahelper library which purgecss plugin uses to scan folders
        /**
         *  the regex is to scan inside src folder 
         *  all the folders and all the files in them
         *  nodir prevents glob from going to the path 
         *  matching exactly the regex with ** but to 
         *  treat it as regex
         */
        new PurgeCSSPlugin({
            paths: glob.sync(`${purgePath.src}/**/*`, { nodir: true }),
            //to ignore a class from getting purged add it to the safelist like this
            // safelist: ["dummy-class-to-be-cleared-by-purgecss-plugin"],
        }),
    ],
}
