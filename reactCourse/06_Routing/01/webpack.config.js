const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    watch: NODE_ENV === 'development',
    devtool: NODE_ENV === 'development' && 'eval-source-map',
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel']
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        })
    ],
    devServer: {
        historyApiFallback: true
    }
};
