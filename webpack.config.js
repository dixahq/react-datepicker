var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/index",
  output: {
    libraryTarget: "umd",
    library: "DatePicker",
    path: "./dist/"
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
  resolve: {
    extensions: [".js", ".jsx"]
  },
  externals: [
    {
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom"
      }
    },
    {
      react: {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    },
    {
      moment: {
        root: "moment",
        commonjs2: "moment",
        commonjs: "moment",
        amd: "moment"
      }
    },
    {
      "react-onclickoutside": {
        root: "onClickOutside",
        commonjs2: "react-onclickoutside",
        commonjs: "react-onclickoutside",
        amd: "react-onclickoutside"
      }
    }
  ],
  node: { Buffer: false },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin("style.css", { allChunks: true })
  ]
};
