import { app, ipcMain, Menu } from "electron";

import ProcessorType from "@common/constants/processor-type";
import {
  APP_INFO,
  APP_METRICS,
  ELECTRON_INFO,
  FIND_MODS,
  LOAD_XML_FILE,
  OPEN_DIRECTORY_V2,
  MODIFY_DIRECTORY_V2,
  READ_CONFIG,
  READ_MOD_CONFIG_V2,
  WRITE_CONFIG,
  READ_CONFIG_ALL,
  OPEN_CONFIG_FILE,
  OPEN_EXTERNAL_LINK,
  QUERY_NEXUS_METADATA,
} from "@common/event";
import MENU_BAR from "@common/constants/menu";
import { Logger, Global, DEBUG, WARN } from "@common/logger";
import { isDevelopment } from "@common/utils/env";
import { Builder, ConfigStore } from "@common/storage";

import Main, { MainV2 } from "./models/main";

import { createWindow, recreateWindow, quitWindow } from "./events/windows";
import { getAppInfoV2, getAppMetrics, getElectronInfo } from "./events/appinfo";
import { loadXmlFile } from "./events/xml";
import { openConfigFile, readConfig, readConfigAll, readModConfigV2, writeConfig } from "./events/storage";
import findMods from "./events/find-mods";
import modifyDirectory from "./events/modify-directory";
import openDirectory from "./events/open-directory";
import openExternalLink from "./events/open-external-link";
import { queryNexusMetadata } from "./events/nexus-mods";

Global.setLevel(isDevelopment() ? DEBUG : WARN);
const logger = new Logger(ProcessorType.MAIN, "index");

app.on("ready", createWindow(logger));
app.on("window-all-closed", quitWindow(logger));
app.on("activate", recreateWindow(logger));

Menu.setApplicationMenu(MENU_BAR);

const store = new ConfigStore();

const main = new Main(ipcMain, store);
main
  .handle(APP_METRICS, getAppMetrics)
  .handle(ELECTRON_INFO, getElectronInfo)
  .handle(FIND_MODS, findMods)
  .handle(LOAD_XML_FILE, loadXmlFile)
  .handle(OPEN_DIRECTORY_V2, openDirectory)
  .handle(MODIFY_DIRECTORY_V2, modifyDirectory)
  .handle(OPEN_CONFIG_FILE, openConfigFile)
  .handle(OPEN_EXTERNAL_LINK, openExternalLink)
  .handle(READ_CONFIG, readConfig)
  .handle(READ_CONFIG_ALL, readConfigAll)
  .handle(READ_MOD_CONFIG_V2, readModConfigV2)
  .handle(WRITE_CONFIG, writeConfig)
  .handle(QUERY_NEXUS_METADATA, queryNexusMetadata);

const mainV2 = new MainV2(ipcMain, Builder());
mainV2.handle(APP_INFO, getAppInfoV2);
