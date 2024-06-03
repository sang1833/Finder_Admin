const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    port: 6005,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],

    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      excludeChunks: ['chat_app'],
      template: './index.html',
    }),
    new ModuleFederationPlugin({
      name: 'chat_app',
      filename: 'remoteEntry.js',
      exposes: {
        ChatAppLoader: './src/loader.ts',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
  ],
};
