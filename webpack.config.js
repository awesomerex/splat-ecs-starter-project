var path = require("path");
var webpack = require("webpack");

/* eslint-disable no-undef */
var environment = process.env["NODE_ENV"] || "development";

function escapeForRegExp(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

function pathForRegExp(unsafePath) {
  var normalized = path.resolve(__dirname, unsafePath);
  return escapeForRegExp(normalized);
}

var imagePath = pathForRegExp("src/images/");
var imageRegExp = new RegExp(imagePath + ".*\\.(jpe?g|png|gif|svg)$", "i");

var fontPath = pathForRegExp("src/fonts/");
var fontRegExp = new RegExp(fontPath + ".*\.(eot|svg|ttf|woff2?)$", "i");

var soundPath = pathForRegExp("src/sounds/");
var soundRegExp = new RegExp(soundPath + ".*\\.(mp3|ogg|wav)$", "i");

var htmlPath = pathForRegExp("src/index.html");
var htmlRegExp = new RegExp(htmlPath, "i");

module.exports = {
  entry: "./src/game",
  output: {
    path: __dirname + "/build/html",
    filename: "index.js"
  },
  module: {
    preLoaders: [
      { test: /\.(js|json)$/, exclude: /node_modules/, loader: "eslint-loader" }
    ],
    loaders: [
      { test: /\.json$/, loader: "json" },
      {
        test: imageRegExp,
        loaders: [
          "file?hash=sha512&digest=hex&name=images/[name].[ext]"
          //"image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false"
        ]
      },
      {
        test: fontRegExp,
        loader: "file?hash=sha513&digest=hex&name=fonts/[name].[ext]"
      },
      {
        test: soundRegExp,
        loader: "file?hash=sha512&digest=hex&name=sounds/[name].[ext]"
      },
      {
        test: htmlRegExp,
        loader: "file?hash=sha512&digest=hex&name=[name].[ext]"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __PRODUCTION__: environment === "production",
      __TEST__: environment === "test",
      __DEVELOPMENT__: environment === "development"
    })
  ]
};
