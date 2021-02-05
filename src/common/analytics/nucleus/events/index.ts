import { OPEN_PAGE, OpenPageProps } from "./open-page";
import { UPDATE_SETTINGS, UpdateSettingsProps } from "./update-settings";
import { TOGGLE_MOD_DIRECTORY, ToggleModDirectoryProps } from "./toggle-mod-directory";

type Events = {
  [OPEN_PAGE]: OpenPageProps;
  [UPDATE_SETTINGS]: UpdateSettingsProps;
  [TOGGLE_MOD_DIRECTORY]: ToggleModDirectoryProps;
};

export type { Events };
export { OPEN_PAGE, UPDATE_SETTINGS, TOGGLE_MOD_DIRECTORY };
