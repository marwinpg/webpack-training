const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/hello-world.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/static/",
    clean: true,
  },
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 3000,
      automaticNameDelimiter: "_",
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // webpack processes loaders from right to left
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-proposal-pipeline-operator", // take a look at this https://medium.com/@ntnprdhmm/babel-7-pipeline-operator-in-javascript-a7724212b8ba
                {
                  proposal: "minimal",
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      filename: "hello-world.html",
      title: "Hello World",
      template: "src/page-template.hbs",
      description: "Hello world",
      minify: false,
    }),
  ],
};
