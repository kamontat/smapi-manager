import { contextBridge, ipcRenderer } from "electron";

import { APIKEY } from "@common/constants/secrets";
import { Global, Logger } from "@common/logger";

import DataLoader, { DataMapper, apiName } from "@common/communication";
import { whitelist } from "./whitelist";

process.once("loaded", () => {
  Global.auto();

  const logger = new Logger();

  contextBridge.exposeInMainWorld(apiName, {
    send: async (raw: DataMapper<string>) => {
      const input = DataLoader.builder(raw).sendToPreload();
      input.log(logger);

      const forwarder = input.sendToMain();
      if (whitelist.includes(forwarder.type)) {
        try {
          forwarder.valid(APIKEY);

          const result = await ipcRenderer.invoke(raw.type, forwarder.toJSON());
          const receiver = forwarder.returnToPreload().withOutput(result);

          const output = receiver.returnToRenderer();
          output.log(logger);

          return output.toJSON();
        } catch (e) {
          logger.error(e);

          return Promise.reject(e);
        }
      } else {
        const err = `${input.type} (${input.subtype}) is not in preload whitelist`;
        logger.warn(err);

        return Promise.reject(new Error(err));
      }
    },
  });
});
