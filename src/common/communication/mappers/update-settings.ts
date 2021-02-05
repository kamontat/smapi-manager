import type { SettingValue } from "@common/storage/setting/data";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const UPDATE_SETTINGS = "update-settings";

type UpdateSettings = DataMapper<typeof UPDATE_SETTINGS, void, Partial<SettingValue>, void>;
const builder = (setting: Partial<SettingValue>): UpdateSettings => {
  return wrapper({
    type: "update-settings",
    input: setting,
  });
};

export default builder;
export { UPDATE_SETTINGS };
export type { UpdateSettings };
