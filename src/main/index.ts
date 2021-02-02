import { app, ipcMain, Menu } from "electron";
import { Global } from "@common/logger";

import MENU_BAR from "./constants/menu";
import MainBuilder from "./models/builder";

import createWindow from "./implements/create-window";
import recreateWindow from "./implements/recreate-window";
import quitWindow from "./implements/quit-window";

import readStorage, { READ_STORAGE } from "./implements/read-storage";
import readAllStorage, { READ_ALL_STORAGE } from "./implements/read-all-storage";
import readAppInfo, { READ_APP_INFO } from "./implements/read-app-info";
import readAppMetric, { READ_APP_METRIC } from "./implements/read-app-metric";
import writeStorage, { WRITE_STORAGE } from "./implements/write-storage";
import readElectronInfo, { READ_ELECTRON_INFO } from "./implements/read-electron-info";
import readFullInfo, { READ_FULL_INFO } from "./implements/read-full-info";
import openFile, { OPEN_FILE } from "./implements/open-file";
import openStorage, { OPEN_STORAGE } from "./implements/open-storage";
import readXmlFile, { READ_XML_FILE } from "./implements/read-xml-file";
import openExternalLink, { OPEN_EXTERNAL_LINK } from "./implements/open-external-link";
import readI18n, { READ_I18N } from "./implements/read-i18n";
import readI18nPage, { READ_I18N_PAGE } from "./implements/read-i18n-page";
import findModDirectory, { FIND_MOD_DIRECTORY } from "./implements/find-mod-directory";
import writeAllStorage, { WRITE_ALL_STORAGE } from "./implements/write-all-storage";
import readAllEventCounterAnalytic, {
  READ_ALL_EVENT_COUNTER_ANALYTIC,
} from "./implements/read-all-event-counter-analytic";
import readModCollection, { READ_MOD_COLLECTION } from "./implements/read-mod-collection";
import updateUniqueId, { UPDATE_UNIQUE_ID } from "./implements/update-unique-id";
import validateNexusApikey, { VALIDATE_NEXUS_APIKEY } from "./implements/validate-nexus-apikey";
import toggleModDirectory, { TOGGLE_MOD_DIRECTORY } from "./implements/toggle-mod-directory";

Global.auto();

const main = new MainBuilder(app, ipcMain);
main
  .onReady(createWindow)
  .onReactivate(recreateWindow)
  .onQuit(quitWindow)
  .handle(READ_STORAGE, readStorage)
  .handle(READ_ALL_STORAGE, readAllStorage)
  .handle(WRITE_STORAGE, writeStorage)
  .handle(WRITE_ALL_STORAGE, writeAllStorage)
  .handle(READ_APP_INFO, readAppInfo)
  .handle(READ_APP_METRIC, readAppMetric)
  .handle(READ_FULL_INFO, readFullInfo)
  .handle(READ_ELECTRON_INFO, readElectronInfo)
  .handle(OPEN_FILE, openFile)
  .handle(OPEN_STORAGE, openStorage)
  .handle(OPEN_EXTERNAL_LINK, openExternalLink)
  .handle(READ_XML_FILE, readXmlFile)
  .handle(READ_I18N, readI18n)
  .handle(READ_I18N_PAGE, readI18nPage)
  .handle(FIND_MOD_DIRECTORY, findModDirectory)
  .handle(READ_MOD_COLLECTION, readModCollection)
  .handle(READ_ALL_EVENT_COUNTER_ANALYTIC, readAllEventCounterAnalytic)
  .handle(UPDATE_UNIQUE_ID, updateUniqueId)
  .handle(VALIDATE_NEXUS_APIKEY, validateNexusApikey)
  .handle(TOGGLE_MOD_DIRECTORY, toggleModDirectory);

Menu.setApplicationMenu(MENU_BAR);
