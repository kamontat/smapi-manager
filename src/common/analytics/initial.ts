import type { Storage } from "@common/storage";

import EventCounter from "./models/EventCounter";
import Nucleus from "./nucleus";

interface Analytics {
  eventCounter: EventCounter;
  nucleus: Nucleus;
}

class Analytic {
  static build(store: Storage): Analytics {
    return {
      eventCounter: new EventCounter(),
      nucleus: new Nucleus(store),
    };
  }
}

export default Analytic;
export type { Analytics };
