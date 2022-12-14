const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const baseConfig = {
    entry: {
        main: path.resolve(__dirname, './src/pages/main/main'),
        cart: path.resolve(__dirname, './src/pages/cart-page/cart')
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/i, 
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader",
                ],
            },
            {   test: /\.ts$/i, 
                use: 'ts-loader' },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: 'html-loader' 
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        assetModuleFilename: './src/assets/[name].[ext]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/pages/main/main.html'),
            filename: 'index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/pages/cart-page/cart-page.html'),
            filename: 'cart-page.html',
            chunks: ['cart']
        }),
        new CleanWebpackPlugin(),
        new EslintPlugin({ extensions: 'ts' }),
    ],
    performance: {
        hints: false,
    },
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
