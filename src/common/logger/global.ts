import { getNodeEnv, getTest } from "@common/utils/env";
import { Level, DEBUG, INFO, WARN, ERROR } from "./level";

class Global {
  static level: Level = INFO;

  static setLevel(level: Level): void {
    Global.level = level;
  }

  static byEnvironment(env: string): void {
    let level = DEBUG;

    if (env === "production") level = ERROR;
    else if (env === "test") level = WARN;

    Global.setLevel(level);
  }

  static auto(): void {
    let level = DEBUG;

    if (getNodeEnv().is("production")) level = ERROR;
    if (getTest().value()) level = WARN;

    Global.setLevel(level);
  }
}

export default Global;
