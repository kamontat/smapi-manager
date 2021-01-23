// eslint-disable @typescript-eslint/no-var-requires

const sveltePreprocess = require("svelte-preprocess");
const rules = require("../webpack.rules");
const plugins = require("../webpack.plugins");
const resolve = require("../webpack.resolve");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  module: {
    rules: []
      .concat({
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
      })
      .concat({
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      })
      .concat(...rules),
  },
  plugins: plugins("renderer"),
  resolve: {
    ...resolve,
    mainFields: ["svelte", "browser", "module", "main"],
  },
};

// eslint-enable @typescript-eslint/no-var-requires
