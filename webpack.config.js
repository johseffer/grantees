const path = require("path");
const webpack = require('webpack');

module.exports = {
    mode: 'development',   
    entry: path.join(__dirname, "src", "App.js"),
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: {
              loader: "babel-loader"
            },
          },
          {  
            test: /\.scss$/,  
            use: ['style-loader', 'css-loader', 'sass-loader']  
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            loader: 'file-loader',
            options: {
              name: "./images/[hash].[ext]",
            }
          }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/"
    }, 
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './',
        hot: true,
        historyApiFallback: true
    }
};