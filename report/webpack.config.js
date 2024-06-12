const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    port: 6007,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts"],

    alias: {
      "@": path.resolve(__dirname, "src/")
    }
  },
  output: {
    publicPath: "http://localhost:6007/"
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"]
        }
      },
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: { limit: 8192 }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      excludeChunks: ["report_app"],
      template: "./index.html"
    }),
    new ModuleFederationPlugin({
      name: "report_app",
      filename: "remoteEntry.js",
      exposes: {
        ReportAppLoader: "./src/loader.ts"
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"]
        }
      }
    }),
    new Dotenv()
  ]
};
