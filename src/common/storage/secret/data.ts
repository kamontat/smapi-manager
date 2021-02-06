import type { Schema } from "../core/schema";
import type { StorageValue } from "../core/value";

interface SecretValue extends StorageValue {
  /**
   * apikey generated from nexus-mod website
   */
  nexusModsApiKey: string;
}
type SecretKey = keyof SecretValue;

const defaults: SecretValue = {
  encryptedKey: "pA22w0Rd",
  nexusModsApiKey: "",
};

const schema: Schema<SecretValue> = {
  nexusModsApiKey: {
    type: "string",
  },
};

export { defaults, schema };
export type { SecretValue, SecretKey };
