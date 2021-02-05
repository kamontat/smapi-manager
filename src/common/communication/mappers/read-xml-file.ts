import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const READ_XML_FILE = "read-xml-file";

type ReadXmlFile = DataMapper<typeof READ_XML_FILE, void, string, string /* TODO: update string to some xml object */>;
const builder = (filepath: string): ReadXmlFile => {
  return wrapper({
    type: READ_XML_FILE,
    input: filepath,
  });
};

export default builder;
export { READ_XML_FILE };
export type { ReadXmlFile };
