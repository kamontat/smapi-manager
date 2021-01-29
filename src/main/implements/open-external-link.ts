import { shell } from "electron";

import { MainAPIs, OPEN_EXTERNAL_LINK } from "@common/communication";

const openExternalLink: MainAPIs[typeof OPEN_EXTERNAL_LINK] = async ({ data }) => {
  shell.openExternal(data.input);
};

export default openExternalLink;
export { OPEN_EXTERNAL_LINK };
