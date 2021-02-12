import { app, ipcMain, Menu } from "electron";
import { Global } from "@common/logger";

import MENU_BAR from "./constants/menu";
import MainBuilder from "./models/builder";

import createWindow from "./implements/create-window";
import recreateWindow from "./implements/recreate-window";
import quitWindow from "./implements/quit-window";

import {
  clearStorage,
  fetchModData,
  findModDirectoryV2,
  openExternalLink,
  openFile,
  openMod,
  openStorage,
  readAllEventCounterAnalytic,
  readAllStorage,
  readAppInfo,
  readAppMetric,
  readElectronInfo,
  readFullInfo,
  readI18n,
  readI18nPage,
  readModCollectionV2,
  readStorage,
  readXmlFile,
  toggleModDirectory,
  updateUniqueId,
  validateNexusApikey,
  writeAllStorage,
  writeStorage,
} from "./implements";

Global.auto();

const main = new MainBuilder(app, ipcMain);
main
  .onReady(createWindow)
  .onReactivate(recreateWindow)
  .onQuit(quitWindow)
  .handler(clearStorage)
  .handler(fetchModData)
  .handler(findModDirectoryV2)
  .handler(openExternalLink)
  .handler(openFile)
  .handler(openMod)
  .handler(openStorage)
  .handler(readAllEventCounterAnalytic)
  .handler(readAllStorage)
  .handler(readAppInfo)
  .handler(readAppMetric)
  .handler(readElectronInfo)
  .handler(readFullInfo)
  .handler(readI18n)
  .handler(readI18nPage)
  .handler(readModCollectionV2)
  .handler(readStorage)
  .handler(readXmlFile)
  .handler(toggleModDirectory)
  .handler(updateUniqueId)
  .handler(validateNexusApikey)
  .handler(writeAllStorage)
  .handler(writeStorage);

Menu.setApplicationMenu(MENU_BAR);
