const path = require('path');

const target =  'http://localhost:8080';

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      publicPath: '/',
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        proxy: {
          '/product': {
            pattern: /\/product\/\d+/,
            target,
            pathRewrite: {'^/product/\\d+' : 'product-description.html'}
          },
          '/cart': {
            target,
            pathRewrite: {'^/cart' : 'cart-page.html'}
          },
          '/': {
            target,
            pattern: /.*/,
            pathRewrite: {'.*': 'error-page.html'}
          }
        },
    },
};
