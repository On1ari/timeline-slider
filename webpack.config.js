const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.tsx",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "public"), 
    clean: true,
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, exclude: /node_modules/, use: "ts-loader" },
      { test: /\.scss$/i, use: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.(png|jpe?g|gif|svg)$/i, type: "asset/resource" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"), 
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  mode: "development",
};
