import { EventProcessorObject } from "@common/models/event";
import { IpcMainInvokeEvent } from "electron";

export const loadXmlFile = async (_: IpcMainInvokeEvent, obj: EventProcessorObject): Promise<string> => {
  console.log(obj);

  return "";
};
