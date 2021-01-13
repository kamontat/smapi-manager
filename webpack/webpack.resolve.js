const path = require("path") // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  alias: {
    "@common": path.resolve(process.cwd(), 'src/common'),
    "@components": path.resolve(process.cwd(), 'src/renderer/components'),
    "@pages": path.resolve(process.cwd(), 'src/renderer/pages')
  }
};
