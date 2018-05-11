var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ["./docs-site/src/boot"],
  output: {
    path: path.resolve("./docs-site/"),
    filename: "bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx"],

    // Needed to direct the docs to the local version of the datepicker, this is not needed for
    // normal setup.
    alias: {
      "react-datepicker/dist/react-datepicker.css": path.resolve(
        "./src/stylesheets/datepicker.scss"
      ),
      "react-datepicker": path.resolve("./src/index.jsx")
    }
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader"
            }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: "file-loader?name=public/fonts/[name].[ext]"
      }
    ]
  },
  node: { Buffer: false },
  plugins: [
    new ExtractTextPlugin("style.css", { allChunks: true }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
