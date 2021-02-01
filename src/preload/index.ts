import { contextBridge, ipcRenderer } from "electron";

import { APIKEY } from "@common/constants/secrets";
import { Global, Logger } from "@common/logger";

import DataLoader, {
  DataMapper,
  apiName,
  READ_APP_INFO,
  READ_APP_METRIC,
  READ_STORAGE,
  WRITE_STORAGE,
  READ_ELECTRON_INFO,
  OPEN_FILE,
  OPEN_STORAGE,
  READ_FULL_INFO,
  UPDATE_SETTINGS,
  READ_I18N,
  READ_I18N_PAGE,
  READ_ALL_STORAGE,
  FIND_MOD_DIRECTORY,
  WRITE_ALL_STORAGE,
  READ_ALL_EVENT_COUNTER_ANALYTIC,
  READ_MOD_COLLECTION,
  UPDATE_UNIQUE_ID,
} from "@common/communication";

process.once("loaded", () => {
  Global.auto();

  const logger = new Logger();
  const whitelist = [
    READ_STORAGE,
    READ_ALL_STORAGE,
    WRITE_STORAGE,
    WRITE_ALL_STORAGE,
    READ_APP_INFO,
    READ_APP_METRIC,
    READ_FULL_INFO,
    READ_ELECTRON_INFO,
    OPEN_FILE,
    OPEN_STORAGE,
    UPDATE_SETTINGS,
    READ_I18N,
    READ_I18N_PAGE,
    FIND_MOD_DIRECTORY,
    READ_MOD_COLLECTION,
    READ_ALL_EVENT_COUNTER_ANALYTIC,
    UPDATE_UNIQUE_ID,
  ];

  contextBridge.exposeInMainWorld(apiName, {
    send: async (raw: DataMapper<string>) => {
      const input = DataLoader.builder(raw).sendToPreload();
      input.log(logger);

      const forwarder = input.sendToMain();
      // forwarder.log(logger);

      if (whitelist.includes(forwarder.type)) {
        try {
          forwarder.valid(APIKEY);

          const result = await ipcRenderer.invoke(raw.type, forwarder.toJSON());
          const receiver = forwarder.returnToPreload().withOutput(result);
          // receiver.log(logger);

          const output = receiver.returnToRenderer();
          output.log(logger);

          return output.toJSON();
        } catch (e) {
          logger.error(e);

          return Promise.reject(e);
          // return input
          // .returnToRenderer()
          // .withError(typeof e === "string" ? e : e.toString())
          // .toJSON();
        }
      } else {
        const err = `${input.type} (${input.subtype}) is not in preload whitelist`;
        logger.warn(err);

        return Promise.reject(new Error(err));
        // return input.returnToRenderer().withError(err).toJSON();
      }
    },
  });
});
