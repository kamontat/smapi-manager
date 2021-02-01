import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const UPDATE_UNIQUE_ID = "update-unique-id";

type UpdateUniqueId = DataMapper<typeof UPDATE_UNIQUE_ID, void, number, string>;
const builder = (): UpdateUniqueId => {
  return wrapper({
    type: UPDATE_UNIQUE_ID,
    input: 18,
  });
};

export default builder;
export { UPDATE_UNIQUE_ID };
export type { UpdateUniqueId };
