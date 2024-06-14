const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

/** @type {import('webpack').Configuration} */
module.exports = {
  output: {
    publicPath: "auto",
    uniqueName: "angular_app",
    scriptType: "text/javascript",
    assetModuleFilename: "images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts", ".png", ".jpg", ".jpeg", ".gif", ".svg"],
  },
  optimization: {
    runtimeChunk: false,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "header_app",
      filename: "remoteEntry.js",
      exposes: {
        HeaderAppLoader: "./src/app/loader.ts",
      },
      shared: {
        "@angular/core": { singleton: true, eager: true },
        "@angular/common": { singleton: true, eager: true },
        "@angular/router": { singleton: true, eager: true },
        "@angular/common/http": { singleton: true, eager: true },
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom/client": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
  devServer: {
    // this is to remove the error "ws://localhost:4200/ws failed" in the console when we disable live reload
    // also this solve websocket proxy issue in local
    webSocketServer: false,
    hot: true,
    historyApiFallback: true,
  },
};
