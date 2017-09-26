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
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
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
    },
    devServer: {
        contentBase: './build',
        // colors: true,
        historyApiFallback: true,
        inline: true,
        port: 3000
        // process: true
    }
}