import type { DataMapper } from "../models/data-mapper";

const apiName = "api";

interface RendererAPIs {
  send: <M extends DataMapper<string>>(input: M) => Promise<M>;
}

export { apiName };
export type { RendererAPIs };
