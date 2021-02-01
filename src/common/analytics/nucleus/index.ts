import nucleus from "nucleus-nodejs";
import { NUCLEUS_APPID } from "./constants";

type SecondParam<T> = T extends (id: string, option: infer O) => void ? O : never;

class Nucleus {
  private appid: string;
  private appOption: SecondParam<typeof nucleus.init>;
  private enabled: boolean;

  constructor() {
    this.enabled = true;

    this.appid = NUCLEUS_APPID;
    this.appOption = {
      autoUserId: false,
      debug: true,
      disableInDev: false,
      disableErrorReports: false,
      disableTracking: !this.enabled,
      reportInterval: 20, // seconds
    };

    nucleus.init(this.appid, this.appOption);
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

  track(event: string, data: Record<string, string | number | boolean>): void {
    nucleus.track(event, data);
  }

  trackError(name: string, error: Error): void {
    nucleus.trackError(name, error);
  }
}

export default Nucleus;
