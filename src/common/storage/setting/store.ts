import CoreStorage from "../core/store";
import defaults, { SettingValue } from "./data";

class SettingStore extends CoreStorage<"settings", SettingValue> {
  constructor() {
    super("settings", defaults);
  }
}

export default SettingStore;
