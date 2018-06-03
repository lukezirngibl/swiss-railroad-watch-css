var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: ['babel-polyfill', './src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: 'http://localhost:3000/',
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: 'nonExistentDirectory',
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }],
        include: path.join(__dirname, './src')
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Load a custom template
      inject: 'body', // Inject all scripts into the body
    }),
  ]
};

export default config;
