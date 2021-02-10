import type { DataCarrier } from "../models/data-carrier";
import type { DataMapper } from "../models/data-mapper";

const apiName = "api";

interface RendererAPIs {
  send: <M extends DataMapper<string>>(input: M) => Promise<DataCarrier<M>>;
}

export { apiName };
export type { RendererAPIs };
