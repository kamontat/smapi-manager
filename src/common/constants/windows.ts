declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const DEFAULT_HEIGHT = 600;

export const DEFAULT_WIDTH = 800;

export const DEFAULT_WEB_PREFERENCES = {
  nodeIntegration: false, // is default value after Electron v5
  contextIsolation: true, // protect against prototype pollution
  enableRemoteModule: false, // turn off remote
  preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
};
