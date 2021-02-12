import { DataOrigin } from "../constants/data-origin";
import type { DataMapper } from "./data-mapper";

interface DataCarrier<M extends DataMapper<string>> {
  apikey: string;

  type: M["type"];
  subtype?: M["subtype"];

  input?: M["input"];
  output?: M["output"];
  error?: string;

  from: DataOrigin;
  to: DataOrigin;
}

const builder = <M extends DataMapper<string>>(m: M): DataCarrier<M> => {
  return {
    apikey: m.apikey,

    from: DataOrigin.UNKNOWN,
    to: DataOrigin.UNKNOWN,

    type: m.type,
    subtype: m.subtype,
    input: m.input,
    output: m.output,
  };
};

export default builder;
export type { DataCarrier };
