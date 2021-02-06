import type { Schema } from "../core/schema";
import type { StorageValue } from "../core/value";

interface ModValue extends StorageValue {
  /**
   * current chosen mod directory root path
   */
  directory: string;

  recusiveLimit: number;

  /**
   * this updating mean get some data from local machine (internal)
   */
  updateThreshold: number;

  /**
   * this fetching mean get some data from server (external)
   */
  fetchThreshold: number;
}
type ModKey = keyof ModValue;

const defaults: ModValue = {
  directory: "",
  recusiveLimit: 3,
  updateThreshold: 1 * 60 * 60 * 1000, // 1 hours (360,000 milliseconds)
  fetchThreshold: 7 * 24 * 60 * 60 * 1000, // 7 days (604,800,000 milliseconds)
};

const schema: Schema<ModValue> = {
  directory: {
    type: "string",
  },
  recusiveLimit: {
    type: "integer",
    minimum: 1,
    maximum: 10,
  },
  updateThreshold: {
    type: "integer",
  },
  fetchThreshold: {
    type: "integer",
  },
};

export { defaults, schema };
export type { ModValue, ModKey };
