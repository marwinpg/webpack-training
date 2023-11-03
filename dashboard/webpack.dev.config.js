const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/dashboard.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9000/",
    clean: true,
  },
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "dashboard.html",
      writeToDisk: true,
    },
    historyApiFallback: {
      index: "dashboard.html",
    },
    port: 9000,
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "dashboard.html",
      title: "Dashboard",
    }),
    new ModuleFederationPlugin({
      name: "App",
      remotes: {
        HelloWorldApp: "HelloWorldApp@http://localhost:9001/remoteEntry.js",
        RaspberryApp: "RaspberryApp@http://localhost:9002/remoteEntry.js",
      },
    }),
  ],
};
