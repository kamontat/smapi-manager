/* eslint-disable @typescript-eslint/no-var-requires */

console.log(`[renderer] webpack configuration is ${process.env.NODE_ENV}`);

const { svelte, ts, css, node } = require("./webpack/webpack.rules");
const plugins = require("./webpack/webpack.plugins");
const resolve = require("./webpack/webpack.resolve");

module.exports = {
  module: {
    rules: [...svelte, ...ts, ...css, ...node],
  },
  plugins: plugins("renderer"),
  resolve: {
    ...resolve,
    mainFields: ["svelte", "browser", "module", "main"],
  },
};

/* eslint-enable @typescript-eslint/no-var-requires */
