const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/raspberry.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9002/",
    clean: true,
  },
  mode: "development",
  devServer: {
    port: 9002,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "raspberry.html",
      writeToDisk: true,
    },
  },
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
      filename: "raspberry.html",
      title: "Raspberry",
      template: "src/page-template.hbs",
      description: "Raspberry",
    }),
    new ModuleFederationPlugin({
      name: "RaspberryApp",
      filename: "remoteEntry.js",
      exposes: {
        "./RaspberryPage": "./src/components/raspberry-page/raspberry-page.js",
      },
      remotes: {
        ImageCaptionApp: "ImageCaptionApp@http://localhost:9003/remoteEntry.js",
      },
    }),
  ],
};
