const webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/src/main.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + 'build'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            }
        ]
    }
}