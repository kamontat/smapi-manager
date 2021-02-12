import type { DataCarrier } from "../models/data-carrier";
import type { DataMapper } from "../models/data-mapper";

const apiName = "api";
const apiMethod = "send";

interface RendererAPIs {
  [apiMethod]: <M extends DataMapper<string>>(input: M) => Promise<DataCarrier<M>>;
}

export { apiName, apiMethod };
export type { RendererAPIs };
