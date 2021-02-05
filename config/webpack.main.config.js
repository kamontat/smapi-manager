/* eslint-disable @typescript-eslint/no-var-requires */

const { ts, node } = require("./webpack/webpack.rules");
const plugins = require("./webpack/webpack.plugins");
const resolve = require("./webpack/webpack.resolve");

module.exports = {
  entry: "./src/main/index.ts",
  module: {
    rules: [...ts, ...node],
  },
  plugins: plugins("main"),
  resolve,
};

/* eslint-enable @typescript-eslint/no-var-requires */
