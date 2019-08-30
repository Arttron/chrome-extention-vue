const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
require('@babel/polyfill');

module.exports = {
  entry: {
    'init': './src/init.js',
    'options': './src/options/options.js',
    'popup': ['@babel/polyfill', './src/popup/popup.js'],
    'app': './src/app/app.js',
    'website': './src/website/website.js',
    'background': './src/background/background.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            "@babel/preset-env"
          ],
          plugins:  [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose": true }],
            ["@babel/plugin-syntax-export-default-from"]
          ]
        }
      },
      {
        test: /\.[s]?[ca]ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(ttf|svg|png)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
