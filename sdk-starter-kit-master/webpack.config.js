const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 80
  }
};
