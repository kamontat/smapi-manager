import type { WebPreferences } from "electron";

import { isDevelopment } from "@common/utils/env";

export const DEFAULT_HEIGHT = 600;
export const DEFAULT_MIN_HEIGHT = 500;

export const DEFAULT_WIDTH = 800;
export const DEFAULT_MIN_WIDTH = 700;

export const DEFAULT_WEB_PREFERENCES: WebPreferences = {
  nodeIntegration: false, // is default value after Electron v5
  contextIsolation: true, // protect against prototype pollution
  enableRemoteModule: false, // turn off remote
  devTools: isDevelopment(),
};
