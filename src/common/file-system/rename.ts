import { rename as renameCB, renameSync } from "fs";
import { promisify } from "util";

const rename = promisify(renameCB);

export { rename, renameSync };
