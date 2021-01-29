import { APIKEY } from "@common/constants/secrets";

interface DataMapper<T extends string, ST = unknown, I = unknown, O = unknown> {
  apikey?: string;

  type: T;
  subtype?: ST;

  input?: I;
  output?: O;
}

const wrapper = <M extends DataMapper<string>>(mapper: M): M => {
  return {
    ...mapper,
    apikey: APIKEY,
  };
};

export default wrapper;
export type { DataMapper };
