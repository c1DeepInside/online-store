const path = require('path');

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
            target: 'http://localhost:8080',
            pathRewrite: {'^/product/\\d+' : 'product-description.html'}
          },
          '/cart': {
            target: 'http://localhost:8080',
            pathRewrite: {'^/cart' : 'cart-page.html'}
          }
        },
    },
};
