const path = require("path"); // eslint-disable-line @typescript-eslint/no-var-requires

const pwd = process.cwd();

module.exports = {
  extensions: [".mjs", ".js", ".ts", ".css", ".scss", ".sass", ".svelte", ".html"],
  alias: {
    svelte: path.resolve(pwd, "node_modules", "svelte"),
    "@common": path.resolve(pwd, "src", "common"),
    "@components": path.resolve(pwd, "src", "renderer", "components"),
    "@pages": path.resolve(pwd, "src", "renderer", "pages"),
    "@layouts": path.resolve(pwd, "src", "renderer", "layouts"),
    "@styles": path.resolve(pwd, "src", "renderer", "styles"),
    "@states": path.resolve(pwd, "src", "renderer", "states")
  },
};
