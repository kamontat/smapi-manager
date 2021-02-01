import { getEnvString } from "@common/utils/env";

const HOME = getEnvString("HOME", "");
const APPDATA = getEnvString("APPDATA", "");

export { HOME, APPDATA };
