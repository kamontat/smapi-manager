import { withDefault } from "@common/utils/checker";

import type { Information } from "../models/information";

export const information = (obj?: Partial<Information>): Information => {
  return {
    env: withDefault(obj?.env, "unknown"),
    name: withDefault(obj?.name, ""),
    version: withDefault(obj?.version, "x.x.x"),
    build: withDefault(obj?.build, ""),
    path: {
      app: withDefault(obj?.path?.app, ""),
      user: withDefault(obj?.path?.user, ""),
      data: withDefault(obj?.path?.data, ""),
      log: withDefault(obj?.path?.log, ""),
      temp: withDefault(obj?.path?.temp, ""),
    },
    author: {
      name: withDefault(obj?.author?.name, ""),
      email: withDefault(obj?.author?.email, ""),
      url: withDefault(obj?.author?.url, ""),
    },
    os: withDefault(obj?.os, "unknown"),
    license: withDefault(obj?.license, "unknown"),
  };
};
