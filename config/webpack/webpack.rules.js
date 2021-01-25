/* eslint-disable @typescript-eslint/no-var-requires */

const { join } = require("path");
const sveltePreprocess = require("svelte-preprocess");
const isProd = process.env.NODE_ENV === "production";

const node = [
  {
    test: /\.node$/,
    use: "node-loader",
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@marshallofsound/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
];

const ts = [
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: true,
      },
    },
  },
];

const svelte = [
  {
    test: /\.(svelte)$/,
    exclude: /node_modules/,
    use: {
      loader: "svelte-loader",
      options: {
        preprocess: sveltePreprocess(),
        compilerOptions: {
          // NOTE Svelte's dev mode MUST be enabled for HMR to work
          dev: !isProd, // Default: false
        },

        // NOTE emitCss: true is currently not supported with HMR
        // Enable it for production to output separate css file
        emitCss: isProd, // Default: false
        // Enable HMR only for dev mode
        hotReload: false, // Default: false
      },
    },
  },
];

const css = [
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      { loader: "style-loader" },
      {
        loader: "css-loader",
        options: {
          sourceMap: !isProd,
        },
      },
    ],
  },
];

module.exports = {
  node,
  ts,
  svelte,
  css,
};

/* eslint-enable @typescript-eslint/no-var-requires */
