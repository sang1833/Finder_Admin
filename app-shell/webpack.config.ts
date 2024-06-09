import { container, DefinePlugin } from 'webpack';
const deps = require('./package.json').dependencies;
const path = require('path');

module.exports = {
  devServer: {
    port: 4200,
    hot: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'http://localhost:4200/',
    uniqueName: 'app-shell',
    scriptType: 'text/javascript',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.png', '.jpg', '.jpeg', '.gif', '.svg'],

    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new container.ModuleFederationPlugin({
      shared: {
        '@angular/core': { eager: true, singleton: true },
        '@angular/common': { eager: true, singleton: true },
        '@angular/router': { eager: true, singleton: true },
        vue: {
          eager: true,
          singleton: true,
        },
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom/client': {
          eager: true,
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
};
