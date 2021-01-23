import type { MainHandler } from "../models/main";

import { shell } from "electron";

const openExternalLink: MainHandler<void, string> = (_, data) => {
  shell.openExternal(data.value);
};

export default openExternalLink;
