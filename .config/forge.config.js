// eslint-disable @typescript-eslint/no-var-requires

const fs = require("fs");
const util = require("util");
const pjson = require("../package.json");

const githubToken = process.env.GITHUB_TOKEN ?? "none";

const BUILD_MODE = pjson.version.includes("beta") ? "beta" : "prod";
const buildIdentifiers = {
  beta: "net.kamontat.beta",
  prod: "net.kamontat",
};

const readdir = util.promisify(fs.readdir);
module.exports = {
  buildIdentifier: BUILD_MODE,
  packagerConfig: {
    executableName: pjson.name,
    buildVersion: pjson.buildVersion,
    appBundleId: buildIdentifiers[BUILD_MODE] ?? buildIdentifiers["prod"],
  },
  makers: [{
    name: "@electron-forge/maker-zip",
  }, ],
  publishers: [{
    name: "@electron-forge/publisher-github",
    config: {
      authToken: githubToken,
      repository: {
        owner: "kamontat",
        name: "smapi-manager",
      },
      prerelease: true,
    },
  }, ],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        mainConfig: "./.config/webpack/main/webpack.config.js",
        renderer: {
          config: "./.config/webpack/renderer/webpack.config.js",
          entryPoints: [{
            html: "./src/renderer/index.html",
            js: "./src/renderer/index.tsx",
            preload: {
              js: "./src/renderer/preload.ts",
            },
            name: "main_window",
          }, ],
        },
      },
    ],
  ],
  hooks: {
    /**
     * @param {any} forgeConfig
     * @param {{platform: string, arch: string, outputPaths: string[]}} options
     */
    postPackage: async (forgeConfig, options) => {
      if (options.spinner) {
        options.spinner.info(
          `Completed packaging for ${options.platform} / ${options.arch} at [${options.outputPaths.join(", ")}]`
        );
        const promises = options.outputPaths.map(p => readdir(p, {
          withFileTypes: true
        }));
        return Promise.all(promises).then(ds => {
          for (const dd of ds) {
            for (const d of dd) {
              options.spinner.info(`  - ${d.name}`)
            }
          }
        });
      }
    },
  },
};

// eslint-enable @typescript-eslint/no-var-requires