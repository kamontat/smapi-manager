const rules = require("../webpack.rules"); // eslint-disable-line @typescript-eslint/no-var-requires
const plugins = require('../webpack.plugins'); // eslint-disable-line @typescript-eslint/no-var-requires
const resolve = require("../webpack.resolve"); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  entry: './src/main/index.ts',
  module: {
    rules: rules,
  },
  plugins: plugins("main"),
  resolve,
};
