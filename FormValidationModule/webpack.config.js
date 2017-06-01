const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    watch: isDevelopment,
    devtool: isDevelopment && 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            failOnError: true,
                            failOnWarning: true
                        }
                    },
                ]
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        })
    ]
};
