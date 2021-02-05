import type Value from "../core/value";

interface ModValue extends Value {
  directory: string;
  recusiveLimit: number;
  updateThreshold: number;
}

type ModKey = keyof ModValue;

const defaults: ModValue = {
  directory: "",
  recusiveLimit: 3,
  updateThreshold: 1 * 60 * 60 * 1000, // 1 hours (360,000 milliseconds)
};

export default defaults;
export type { ModValue, ModKey };
