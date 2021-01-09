const rules = require("../webpack.rules"); // eslint-disable-line @typescript-eslint/no-var-requires
const resolve = require("../webpack.resolve"); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  entry: './src/main/index.ts',
  module: {
    rules: rules,
  },
  resolve: resolve,
};
