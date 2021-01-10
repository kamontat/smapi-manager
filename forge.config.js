const fs = require("fs"); // eslint-disable-line @typescript-eslint/no-var-requires
const util = require("util"); // eslint-disable-line @typescript-eslint/no-var-requires
const pjson = require("./package.json"); // eslint-disable-line @typescript-eslint/no-var-requires

const BUILD_MODE = process.env.BUILD_MODE ?? "prod";
const githubToken = process.env.GITHUB_TOKEN ?? "none";
const buildIdentifiers = {
  beta: "net.kamontat.beta",
  prod: "net.kamontat",
};

console.log(githubToken.substr(0, 4), "...")

const readdir = util.promisify(fs.readdir);
module.exports = {
  buildIdentifier: BUILD_MODE,
  packagerConfig: {
    executableName: pjson.name,
    buildVersion: pjson.buildVersion,
    appBundleId: buildIdentifiers[BUILD_MODE] ?? buildIdentifiers["prod"],
  },
  makers: [
    {
      name: "@electron-forge/maker-zip",
    },
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          maintainer: pjson.author.name,
          homepage: pjson.author.url,
        },
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        options: {
          maintainer: pjson.author.name,
          homepage: pjson.author.url,
        },
      },
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        authToken: githubToken,
        repository: {
          owner: "kamontat",
          name: "smapi-manager",
        },
        prerelease: true,
      },
    },
  ],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        mainConfig: "./webpack/main/webpack.config.js",
        renderer: {
          config: "./webpack/renderer/webpack.config.js",
          entryPoints: [
            {
              html: "./src/renderer/index.html",
              js: "./src/renderer/App.tsx",
              preload: {
                js: "./src/renderer/preload.ts",
              },
              name: "main_window",
            },
          ],
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
        const promises = options.outputPaths.map(p => readdir(p, { withFileTypes: true }));
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
