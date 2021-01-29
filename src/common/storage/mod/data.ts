import type Value from "../core/value";

interface ModValue extends Value {
  directory: string;
  recusiveLimit: number;
}

type ModKey = keyof ModValue;

const defaults: ModValue = {
  directory: "",
  recusiveLimit: 3,
};

export default defaults;
export type { ModValue, ModKey };
