import { ipcRenderer } from "electron";

import ProcessorType from "@common/constants/processor-type";

import Message from "@common/message";
import Logger, { DEBUG, ERROR, Global } from "@common/logger";
import { isDevelopment } from "@common/utils/env";

process.once("loaded", () => {
  Global.setLevel(isDevelopment() ? DEBUG : ERROR);

  const logger = new Logger(ProcessorType.PRELOAD);
  const message = new Message(ProcessorType.PRELOAD);

  message.receive({
    callback: data => {
      data.log(logger);
      ipcRenderer.invoke(data.type, data.toJSON()).then(args => {
        logger.event(ProcessorType.MAIN, `receiving data from ${data.type}`);
        window.postMessage(data.clone(ProcessorType.PRELOAD, args).toJSON(), "*");
      });
    },
  });
});
