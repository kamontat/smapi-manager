import type { Schema } from "../core/schema";
import type { StorageValue } from "../core/value";

interface SMAPIValue extends StorageValue {
  /**
   * This is a boolean of whether smapi is installed on local machine
   */
  isInstalled: boolean;
}
type SMAPIKey = keyof SMAPIValue;

const defaults: SMAPIValue = {
  isInstalled: false,
};

const schema: Schema<SMAPIValue> = {
  isInstalled: {
    type: "boolean",
  },
};

export { defaults, schema };
export type { SMAPIValue, SMAPIKey };
