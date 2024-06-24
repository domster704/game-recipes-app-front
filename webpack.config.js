const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv").config({
    path: path.join(__dirname, '.env')
});

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: './src/index.jsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, "build"),
        // path: __dirname,
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.module.css$/,
                use: [
                    'style-loader',
                    // 'css-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
        }),
    ],
    devServer: {
        static: {
            directory: __dirname + '/build',
            // directory: __dirname,
        },
        compress: true,
        port: 9005,
        client: {
            progress: false,
        },
        host: 'localhost',
    }
}