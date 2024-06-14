const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    port: 6003,
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
    publicPath: "http://localhost:6003/"
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
      excludeChunks: ["post_app"],
      template: "./index.html"
    }),
    new ModuleFederationPlugin({
      name: "post_app",
      filename: "remoteEntry.js",
      exposes: {
        PostAppLoader: "./src/loader.ts"
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"]
        },
        graphql: {
          singleton: true,
          requiredVersion: deps.graphql
        },
        "socket.io-client": {
          singleton: true,
          requiredVersion: deps["socket.io-client"]
        }
      }
    }),
    new Dotenv()
  ]
};
