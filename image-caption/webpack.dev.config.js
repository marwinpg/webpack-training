const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/image-caption.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9003/",
    clean: true,
  },
  mode: "development",
  devServer: {
    port: 9003,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "image-caption.html",
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"], // webpack processes loaders from right to left
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
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
    new HtmlWebpackPlugin({
      filename: "image-caption.html",
      title: "Image Caption",
      description: "Image Caption",
      template: "src/page-template.hbs",
    }),
    new ModuleFederationPlugin({
      name: "ImageCaptionApp",
      filename: "remoteEntry.js",
      exposes: {
        "./ImageCaption": "./src/components/image-caption/image-caption.js",
      },
    }),
  ],
};
