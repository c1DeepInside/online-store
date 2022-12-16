const fs = require('fs');
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

function getChunk(page) {
    const parts = page.split('-')
    return parts.map(
        (part, idx) => 
            idx === 0 ? part : `${part[0].toUpperCase()}${part.slice(1)}`
    ).join('')
}

function getPages() {
    const pagesPath = path.resolve(__dirname, './src/pages');
    return fs.readdirSync(pagesPath);
}

const entries = {};
getPages().forEach(
    (page) => entries[getChunk(page)] = path.resolve(__dirname, `./src/pages/${page}/index`)
)

const baseConfig = {
    entry: {...entries},
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
        ...getPages().map((page) => (
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, `./src/pages/${page}/${page}.html`),
                filename: `${page}.html`,
                chunks: [getChunk(page)]
            })
        )),
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
