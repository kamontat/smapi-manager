import { OPEN_PAGE, OpenPageProps } from "./open-page";
import { UPDATE_SETTINGS, UpdateSettingsProps } from "./update-settings";

type Events = {
  [OPEN_PAGE]: OpenPageProps;
  [UPDATE_SETTINGS]: UpdateSettingsProps;
};

export type { Events };
export { OPEN_PAGE };
