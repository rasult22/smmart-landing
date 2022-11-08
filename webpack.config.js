const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'ru-RU/index.html',
    //   template: './src/ru-RU/index.html',
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'en-EN/index.html',
    //   template: './src/en-EN/index.html',
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'kk-KZ/index.html',
    //   template: './src/kk-KZ/index.html',
    // }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'src/assets/*',
          to({ context, absoluteFilename }) {
            return "assets/[name][ext]";
          }, 
        },
        // { 
        //   from: 'src/ru-RU/*',
        //   to({ context, absoluteFilename }) {
        //     return "ru-RU/[name][ext]";
        //   }, 
        // },
        // { 
        //   from: 'src/en-EN/*',
        //   to({ context, absoluteFilename }) {
        //     return "ru-RU/[name][ext]";
        //   }, 
        // },
        // { 
        //   from: 'src/kk-KZ/*',
        //   to({ context, absoluteFilename }) {
        //     return "kk-KZ/[name][ext]";
        //   }, 
        // },
        { 
          from: 'src/root/*',
          to({ context, absoluteFilename }) {
            return "[name][ext]";
          }, 
        },
        { 
          from: 'src/root/.github/workflows/*',
          to({ context, absoluteFilename }) {
            return ".github/workflows/[name][ext]";
          }, 
        }
      ]
    }),
    new MiniCssExtractPlugin({filename: 'main.css'})
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin({
        minimizerOptions: {
          minifyCSS: true,
          minifyJS: true
        }
      }),
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [ MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
    ],
  },
};