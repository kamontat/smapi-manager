import ConfigStore from "./config/store";
import ConfigValue from "./config/data";
type ConfigKey = keyof ConfigValue;

export { ConfigStore, ConfigValue, ConfigKey };
