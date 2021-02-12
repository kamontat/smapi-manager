import type { Executor } from "@common/communication";
import type { Mapping } from "./mapping";

export interface Handler<K extends keyof Mapping = keyof Mapping, M extends Mapping[K] = Mapping[K]> {
  type: M["type"];
  executor: Executor<M>;
}

export const handler = <K extends keyof Mapping, M extends Mapping[K] = Mapping[K]>(
  type: K,
  executor: Executor<M>
): Handler<K, M> => {
  return {
    type,
    executor,
  };
};
