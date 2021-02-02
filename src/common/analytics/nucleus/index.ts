import nucleus from "nucleus-nodejs";
import type { Storage } from "@common/storage";
import { getNodeEnv } from "@common/utils/env";

import { NUCLEUS_APPID } from "./constants";
import { Events, OPEN_PAGE } from "./events";

type SecondParam<T> = T extends (id: string, option: infer O) => void ? O : never;

class Nucleus {
  private appid: string;
  private appOption: SecondParam<typeof nucleus.init>;
  private enabled: boolean;

  constructor(store: Storage) {
    this.enabled = true;

    this.appid = NUCLEUS_APPID;
    this.appOption = {
      autoUserId: false,
      debug: getNodeEnv().is("development"),
      disableInDev: true,
      disableErrorReports: false,
      disableTracking: !this.enabled,
      reportInterval: 30, // seconds
    };

    nucleus.init(this.appid, this.appOption);
    const id = store.settings.get("uniqueid");
    if (id) nucleus.setUserId(id);
  }

  setUser(id: string): void {
    nucleus.setUserId(id);
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    nucleus.enableTracking();
    this.enabled = true;
  }

  disable(): void {
    nucleus.disableTracking();
    this.enabled = false;
  }

  toggle(): void {
    if (this.enabled) this.disable();
    else this.enable();
  }

  start(): void {
    nucleus.appStarted();
  }

  openPage(pageName: string): void {
    this.track(OPEN_PAGE, {
      pageName,
    });
  }

  track<K extends keyof Events>(event: K, data: Events[K]): void {
    nucleus.track(event, data);
  }

  trackError(name: string, error: Error): void {
    nucleus.trackError(name, error);
  }
}

export default Nucleus;
