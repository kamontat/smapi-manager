import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const OPEN_EXTERNAL_LINK = "open-external-link";

type OpenExternalLink = DataMapper<typeof OPEN_EXTERNAL_LINK, void, string, void>;
const builder = (urlpath: string): OpenExternalLink => {
  return wrapper({
    type: "open-external-link",
    input: urlpath,
  });
};

export default builder;
export { OPEN_EXTERNAL_LINK };
export type { OpenExternalLink };
