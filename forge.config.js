module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "smapi_manager",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
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
                js: "./src/renderer/preload.ts"
              },
              name: "main_window"
            },
          ],
        },
      },
    ],
  ],
};
