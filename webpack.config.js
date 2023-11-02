const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
    clean: true,
    // clean: {
    //   dry: true, // Log the assets that should be removed instead of deleting them.
    //   keep: /\.css/, // Keep the css files on the dist folder
    // },
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        type: "asset", // Chooses between asset/resource and asset inline depends on the size of the image in this case
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // 3 Kilobytes - If is treated as a file less than 8KB will be an inline asset
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
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
    ],
  },
  plugins: [
    new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      title: "Hello Webpack",
      meta: {
        description: "Some description",
      },
    }),
  ],
};
