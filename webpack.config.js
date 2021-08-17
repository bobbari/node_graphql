const path = require('path');
const Minifyplugin = require('babel-minify-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
      index:'./index.js',
  },
  context:path.resolve(__dirname,'src'),
  devServer: {
    contentBase: "./dist",
    hot: true,
    overlay: true,
    status:{
      color:true
    }
  },
  plugins: [
      new Minifyplugin({
          comments: false
      })
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: '/',
  },
  optimization:{
      splitChunks: {
       chunks: 'all',
     },
  },
  module: {
      rules:[
        {
            // test: /.(js|jsx)$/, 
            test: /\.js?$/,
            exclude: '/node_modules',
            loader: 'babel-loader',
           

        }
      ]
  },
  resolveLoader: {
    modules: [
          __dirname + '/node_modules'
        ]
  }

};