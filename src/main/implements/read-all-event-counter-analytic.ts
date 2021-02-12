import { handler, READ_ALL_EVENT_COUNTER_ANALYTIC } from "@main/communication";

export const readAllEventCounterAnalytic = handler(READ_ALL_EVENT_COUNTER_ANALYTIC, async ({ analytic }) => {
  return analytic.eventCounter.all();
});
