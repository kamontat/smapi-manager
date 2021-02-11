import CoreStorage from "../core/store";
import { defaults, schema } from "./data";

import type { SMAPIValue } from "./data";

const name = "smapi";
class SettingStore extends CoreStorage<typeof name, SMAPIValue> {
  constructor() {
    super(name, defaults, schema);
  }
}

export default SettingStore;
