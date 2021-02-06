import CoreStorage from "../core/store";
import { defaults, schema } from "./data";

import type { SettingValue } from "./data";

const name = "settings";
class SettingStore extends CoreStorage<typeof name, SettingValue> {
  constructor() {
    super(name, defaults, schema);
  }
}

export default SettingStore;
