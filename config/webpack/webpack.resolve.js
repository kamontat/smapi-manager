const path = require("path"); // eslint-disable-line @typescript-eslint/no-var-requires

const pwd = process.cwd();

module.exports = {
  extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".mjs", ".js", ".svelte"],
  alias: {
    svelte: path.resolve(pwd, "node_modules", "svelte"),
    "@common": path.resolve(pwd, "src", "common"),
    "@components": path.resolve(pwd, "src", "renderer", "components"),
    "@pages": path.resolve(pwd, "src", "renderer", "pages"),
  },
};
