import ConfigStore from "./config/store";
import ConfigValue, { defaults as defaultConfig, ConfigKey } from "./config/data";

export {
  /**
   * @deprecated use Storage instead
   */
  ConfigStore,
  /**
   * @deprecated use Storage instead
   */
  defaultConfig,
};
export type {
  /**
   * @deprecated use Storage instead
   */
  ConfigValue,
  /**
   * @deprecated use Storage instead
   */
  ConfigKey,
};

import Builder, { Storage } from "./storage";

export { Builder };
export type { Storage };
