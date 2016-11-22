var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'bootstrap-loader',
    './src'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extension: ['', '.js', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate!html'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 3 versions',
          'sass?outputStyle=expanded'
        ]
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url?limit=10000'
      },
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports?jQuery=jquery'
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      },
      mangle: false,
      output: {
        comments: false
      }
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
