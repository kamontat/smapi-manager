const fs = require("fs"); // eslint-disable-line @typescript-eslint/no-var-requires
const path = require("path") // eslint-disable-line @typescript-eslint/no-var-requires

const random = () => Math.random().toString(36).substr(2, 8);

const location = path.join(process.cwd(), "src", "common", "constants", "secrets.ts")
const token = `${random()}-${random()}-${random()}-${random()}`

console.log(`generated apikey is ${token.substr(0, 4)}...${token.substring(token.length - 4, token.length)}`)
console.log(`write data to ${location}`)

fs.writeFileSync(location, `export const APIKEY = "${token}";
`)
