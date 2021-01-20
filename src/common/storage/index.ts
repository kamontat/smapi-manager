import ConfigStore from "./config/store";
import ConfigValue, { defaults as defaultConfig, ConfigKey } from "./config/data";

// @deprecated
export { ConfigStore, ConfigValue, ConfigKey, defaultConfig };

import Builder, { Storage } from "./storage";

export { Builder };
export type { Storage };
