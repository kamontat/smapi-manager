import { ipcRenderer } from "electron";

import ProcessorType from "@common/constants/processor-type";

import Message from "@common/models/message";
import Logger from "@common/models/logger";

process.once("loaded", () => {
  const logger = new Logger(ProcessorType.PRELOAD);
  const message = new Message(window, ProcessorType.PRELOAD);

  message.receive(ProcessorType.RENDERER, data => {
    data.log(logger);
    ipcRenderer.invoke(data.type(), data.toJSON()).then(args => {
      logger.event(ProcessorType.MAIN, `receiving data from ${data.type()}`);
      window.postMessage(data.clone(ProcessorType.PRELOAD, args).toJSON(), "*");
    });
  });
});
