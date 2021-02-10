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
      try {
        forwarder.validWhitelist(whitelist);
        forwarder.validApikey(APIKEY);

        const result: Error | typeof raw["output"] = await ipcRenderer.invoke(raw.type, forwarder.toJSON());
        if (result instanceof Error) throw result;

        const receiver = forwarder.returnToPreload().withOutput(result);

        const output = receiver.returnToRenderer();
        output.log(logger);

        return output.toJSON();
      } catch (e) {
        // assume that e is Error object
        return forwarder.returnToRenderer().withError(e.message).toJSON();
      }
    },
  });
});
