const path = require("path") // eslint-disable-line @typescript-eslint/no-var-requires

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin // eslint-disable-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = (name) => []
  .concat(process.env.CI !== "true" ? new BundleAnalyzerPlugin({
    analyzerMode: "static",
    reportFilename: path.join(`reports.${name}.html`),
    openAnalyzer: false
  }) : [])
  .concat(name === "renderer" ? new ForkTsCheckerWebpackPlugin(
  ) : []);
