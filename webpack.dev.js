const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
    // build mode for this webpackconfig
    mode: "development",
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
        ]
    },
    plugins: [
        // Bundle Analyzer shows a nice ui of all the bundles we generate
        // it shows the size of the dependencies in the bundle 
        // which we can optimize by extracting common dependencies into
        // a separate bundle this reduces overall bundle size by avoiding repetition 
        // it also helps to import these dependencies dynamically when required
        new BundleAnalyzerPlugin({

        }),
    ],
});



/**
 * Difference Between  Prod and Dev config:
 * 
 * ------------Production Webpack Configuration----------------
 * 
 * - Minification of HTML/CSSS/JS files
 * 
 * - Tree Shaking/ Dead Code Elimination JS/CSS
 * 
 * - Copying of assets to dist to maintain 
 *   references the same way as src folder 
 *   structure
 * 
 * - Production env variables
 * 
 * 
 * ------------Development Webpack Configuration----------------
 * 
 * - Webpack Dev Server
 * 
 * - Dev env variables
 * 
 * - Bundle Analyzer
 * 
 * -------------Common Webpack Configuration--------------------
 * - Setup of loaders
 * 
 * - Entry and Output specifications
 * 
 * - HTML file creation
 * 
 * - Split chunks
 */