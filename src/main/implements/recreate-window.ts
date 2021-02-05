import { BrowserWindow } from "electron";

import createWindow from "./create-window";

import type { AppExecutor } from "../models/app-executor";

const recreateWindow: AppExecutor = props => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    props.logger.debug(`recreate windows when no windows exist`);
    createWindow(props);
  }
};

export default recreateWindow;
