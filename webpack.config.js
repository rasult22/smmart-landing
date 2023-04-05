const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { readdirSync } = require('fs');


const htmlPagesNames = []
const posts = readdirSync('./src/posts')
posts.forEach(x => {
  htmlPagesNames.push(x.split('.html')[0])
})

const multipleHtmlPlugins = htmlPagesNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/posts/${name}.html`,
    filename: `${name}/index.html`
  })
})

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
    new HtmlWebpackPlugin({
      template: './src/error.html',
      filename: 'error.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/posts.html',
      filename: 'posts.html'
    }),
    ...multipleHtmlPlugins,
    new HtmlWebpackPlugin({
      template: './src/en/index.html',
      filename: 'en/index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/en/posts.html',
      filename: 'en/posts.html',
    }),
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
        {
          from: 'src/images/*',
          to({ context, absoluteFilename }) {
            return "images/[name][ext]";
          },
        },
        {
          from: 'src/privacy/*',
          to({ context, absoluteFilename }) {
            return "privacy/[name][ext]";
          },
        },
        {
          from: 'src/root/*',
          to({ context, absoluteFilename }) {
            return "[name][ext]";
          },
        },
        // {
        //   from: 'src/posts/*',
        //   to({ context, absoluteFilename }) {
        //     return "[name]/index[ext]";
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
        // {
        //   from: 'src/root/.github/workflows/*',
        //   to({ context, absoluteFilename }) {
        //     return ".github/workflows/[name][ext]";
        //   },
        // }
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
        include: path.resolve(__dirname, 'src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
    ],
  },
};