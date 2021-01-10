const pjson = require("./package.json") // eslint-disable-line @typescript-eslint/no-var-requires
const BUILD_MODE = process.env.BUILD_MODE ?? "prod";
const buildIdentifiers = {
  beta: "net.kamontat.beta",
  prod: "net.kamontat",
};

module.exports = {
  buildIdentifier: BUILD_MODE,
  packagerConfig: {
    appBundleId: buildIdentifiers[BUILD_MODE] ?? buildIdentifiers["prod"],
  },
  makers: [
    {
      name: "@electron-forge/maker-zip",
    },
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "smapi_manager",
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          maintainer: pjson.author.name,
          homepage: pjson.author.url
        }
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        options: {
          maintainer: pjson.author.name,
          homepage: pjson.author.url
        }
      },
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
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
};
