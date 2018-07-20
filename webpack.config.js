/**
 * @file webpack.config.js
 * Exports configuration for Webpack.
 */

const rules = [];
rules.push({
  test: /\.js|jsx$/,
  exclude: /node_modules/,
  use: 'babel-loader'
});

module.exports = {
  module: {
    rules
  }
};
