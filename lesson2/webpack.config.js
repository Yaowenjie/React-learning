var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');

var dashboard = new Dashboard();

module.exports = {
  entry: {
    app: ['./index.js']
  },
  output: {
    path : __dirname,
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 3333
  },
  plugins: [
    new DashboardPlugin(dashboard.setData)
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
