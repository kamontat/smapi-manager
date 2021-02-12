import type { SettingValue } from "@common/storage/setting/data";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const UPDATE_SETTINGS = "update-settings";

type UpdateSettings = DataMapper<typeof UPDATE_SETTINGS, void, Partial<SettingValue>, void>;
const updateSettings = (setting: Partial<SettingValue>): UpdateSettings => {
  return wrapper({
    type: "update-settings",
    input: setting,
  });
};

export { UPDATE_SETTINGS, updateSettings };
export type { UpdateSettings };
