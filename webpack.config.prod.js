import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

/* eslint-disable max-len */

export default {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: {
        vendor: path.resolve(__dirname, 'src/vendor'),
        main: path.resolve(__dirname, 'src/index'),
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js',
    },
    plugins: [
        // Generate external CSS file
        new ExtractTextPlugin('[name].[contenthash].css'),

        // Hash files using MD5
        new WebpackMd5Hash(),

        // seperates vendor libraries from bundle
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        // Create HTML file that includes reference to bundled JS
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLS: true,
            },
            inject: true,
        }),

        // Eliminate duplicate packages when generating bundle
        new webpack.optimize.DedupePlugin(),

        // Minify JS
        new webpack.optimize.UglifyJsPlugin(),
    ],
    module: {
        loaders: [
            {test: /\.js$/, include: /node_modules/, loaders: ['babel']},
            {test: /\.css$/, loaders: ExtractTextPlugin.extract('css?sourceMap')},
        ],
    },
};
