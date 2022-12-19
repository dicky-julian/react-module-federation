// shell/webpack.config.js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationConfig = require('./federation.config.json');
const { dependencies } = require("./package.json");

module.exports = {
  output: {
    publicPath: `${ModuleFederationConfig.host}:${ModuleFederationConfig.port}/`,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  
  devServer: {
    port: ModuleFederationConfig.port,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          "style-loader", 
          "css-loader", 
          "postcss-loader",
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          },
        ],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
        }
      },
    ],
  },
  
  plugins: [
    new ModuleFederationPlugin({
      ...ModuleFederationConfig.config,
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};