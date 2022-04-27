const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("node:path");

const isDevelopment = process.env.NODE_ENV !== "production";

/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */
const config = {
  mode: isDevelopment ? "development" : "production",
  entry: path.join(__dirname, "src", "index.jsx"),
  output: {
    path: path.resolve("build"),
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "src/index.html" }),
    isDevelopment && new ReactRefreshPlugin(),
  ].filter(Boolean),
  devServer: {
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
              plugins: [isDevelopment && "react-refresh/babel"].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
};

module.exports = config;
