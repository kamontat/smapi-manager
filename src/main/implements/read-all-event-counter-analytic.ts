import { MainAPIs, READ_ALL_EVENT_COUNTER_ANALYTIC } from "@common/communication";

const readAllEventCounterAnalytic: MainAPIs[typeof READ_ALL_EVENT_COUNTER_ANALYTIC] = async ({ analytic }) => {
  return analytic.eventCounter.all();
};

export default readAllEventCounterAnalytic;
export { READ_ALL_EVENT_COUNTER_ANALYTIC };
