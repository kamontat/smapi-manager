import { EventObject } from "@common/models/event";
import { IpcMainInvokeEvent } from "electron";

export const loadXmlFile = async (_: IpcMainInvokeEvent, obj: EventObject): Promise<string> => {
  console.log(obj);

  return "";
};
