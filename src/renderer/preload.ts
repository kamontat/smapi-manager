import { ipcRenderer } from "electron";

import ProcessorType from "@common/constants/processor-type";

import Message from "@common/models/message";

process.once("loaded", () => {
  const message = new Message(window, ProcessorType.PRELOAD);

  message.receive(ProcessorType.RENDERER, (data, logger) => {
    data.log(logger);
    ipcRenderer.invoke(data.type(), data.toJSON()).then(args => {
      logger.event(ProcessorType.MAIN, `receiving data from ${data.type()}`);
      window.postMessage(data.clone(ProcessorType.PRELOAD, args).toJSON(), "*");
    });
  });
});
