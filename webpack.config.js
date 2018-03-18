const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

module.exports = {
  entry: './src/main.ts',
  output: {
    filename: 'bundles/[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
  extensions: [ '.tsx', '.ts', '.js' ]
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx$/,
        use: 'babel-loader!ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },
  devServer:{
    port:9001,
    host: "0.0.0.0",
    contentBase: [
      path.resolve(__dirname, "dist"),
      path.resolve(__dirname, "node_modules"),
    ],
    hot: true,
    inline: true,
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000
    },
    open: true,
    openPage: ""
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: "body"
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].[hash].css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: './src/**/*.html', to: './dist' }
    ])
  ]
};

