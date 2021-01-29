import EventCounter from "./models/EventCounter";

interface Analytics {
  eventCounter: EventCounter;
}

class Analytic {
  static build(): Analytics {
    return {
      eventCounter: new EventCounter(),
    };
  }
}

export default Analytic;
export type { Analytics };
