import { uuid } from "@common/utils/uuid";

import type { Schema } from "../core/schema";
import type { StorageValue } from "../core/value";

interface SettingValue extends StorageValue {
  /**
   * nucleus tracking user id
   */
  uniqueid: string;

  /**
   * display language
   */
  language: string;

  /**
   * enabled more describe information
   */
  tutorialMode: boolean;

  /**
   * enabled early features
   */
  betaMode: boolean;

  /**
   * enabled extra debugging information
   */
  debugMode: boolean;
}
type SettingKey = keyof SettingValue;

const defaults: SettingValue = {
  uniqueid: uuid(18),
  language: "en",
  tutorialMode: true,
  betaMode: false,
  debugMode: false,
};

const schema: Schema<SettingValue> = {
  uniqueid: {
    type: "string",
    minLength: 16,
  },
  language: {
    type: "string",
    minLength: 2,
    maxLength: 3,
  },
  tutorialMode: {
    type: "boolean",
  },
  betaMode: {
    type: "boolean",
  },
  debugMode: {
    type: "boolean",
  },
};

export { defaults, schema };
export type { SettingValue, SettingKey };
