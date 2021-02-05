import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";
import type { KeyValue } from "@common/utils/array";

const READ_ALL_EVENT_COUNTER_ANALYTIC = "read-all-event-counter-analytic";

type ReadAllEventCounterAnalytic = DataMapper<
  typeof READ_ALL_EVENT_COUNTER_ANALYTIC,
  void,
  void,
  KeyValue<string, number>[]
>;

const builder = (): ReadAllEventCounterAnalytic => {
  return wrapper({
    type: READ_ALL_EVENT_COUNTER_ANALYTIC,
  });
};

export default builder;
export { READ_ALL_EVENT_COUNTER_ANALYTIC };
export type { ReadAllEventCounterAnalytic };
