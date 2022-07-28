const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'backend', 'dist'),
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
      {
        test: /\.jpeg/,
        type: 'asset/resource',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@import '@/assets/styles/_colors.scss'; @import '@/assets/styles/global.scss'; @import '@/assets/styles/reset.scss'; @import '@/assets/styles/_mixin.scss';`,
            },
          },
        ],
      },
      {
        test: /\.(png|gif|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // name: 'images/[name].[ext]?[hash]',
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      inject: true,
      filename: path.resolve(__dirname, '..', 'backend', 'dist', 'index.html'),
      type: 'module',
    }),
    new CleanWebpackPlugin({ filename: 'build.js' }),
  ],
};

module.exports = config;
