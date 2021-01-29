import { isDevelopment } from "@common/utils/env";
import { Level, DEBUG, INFO, WARN } from "./level";

class Global {
  static level: Level = INFO;

  static setLevel(level: Level): void {
    Global.level = level;
  }

  static auto(): void {
    Global.setLevel(isDevelopment() ? DEBUG : WARN);
  }
}

export default Global;
