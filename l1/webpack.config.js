var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');

var dashboard = new Dashboard();

module.exports = {
  entry: {
    app: ['./main.js', './counter.js']
  },
  quiet: false,
  output: {
    path : './',
    filename: 'index.js'
  },
  devServer: {
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: false,
      errorDetails: false,
      warnings: false,
      publicPath: false
    },
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
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
