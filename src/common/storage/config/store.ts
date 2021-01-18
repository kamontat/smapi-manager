import CoreStorage from "../core/store";
import ConfigValue, { defaults } from "./data";

class ConfigStore extends CoreStorage<ConfigValue> {
  constructor() {
    super("config", defaults);
  }
}

export default ConfigStore;
