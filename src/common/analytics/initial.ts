import EventCounter from "./models/EventCounter";
import Nucleus from "./nucleus";

interface Analytics {
  eventCounter: EventCounter;
  nucleus: Nucleus;
}

class Analytic {
  static build(): Analytics {
    return {
      eventCounter: new EventCounter(),
      nucleus: new Nucleus(),
    };
  }
}

export default Analytic;
export type { Analytics };
