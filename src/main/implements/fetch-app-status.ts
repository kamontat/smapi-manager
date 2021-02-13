import { app } from "electron";
import { handler, FETCH_APP_STATUS, ExecutorArguments } from "@main/communication";

import { Status, statusLatest, statusNeedUpdate } from "@common/application";
import { GHRequester } from "@common/github";
import { Semver } from "@common/utils/semver";
import { validateCaches } from "@common/utils/caches";

import type { DataMapper } from "@common/communication";

const wrapString = <M extends DataMapper<string>>(s: Status, { i18n, store }: ExecutorArguments<M>): Status => {
  return Object.assign(s, {
    string: `${i18n.query(store.settings.get("language"), "appInfo", s.state)}${
      s?.data?.version ? ` (${s.data.version})` : ""
    }`,
  });
};

export const fetchAppStatus = handler(FETCH_APP_STATUS, async args => {
  const threshold = 1_440_000; // 1 day
  const cache = args.store.caches.get("appStatus");
  const { expired } = validateCaches(threshold, cache);

  if (!expired && !args.data.subtype.force) {
    args.logger.debug(`valid cache, return cache data`);
    return cache;
  }

  args.logger.debug(`fetching latest data from github apis`);

  const request = new GHRequester();
  const response = await request.getLatestRelease();

  if (response.code !== 200) throw new Error(`Connection failed: '${response.codeMessage}'`);

  const currentVersion = new Semver(`v${app.getVersion()}`);
  const latestVersion = new Semver(response.json.tag_name);

  let status = statusLatest();

  if (latestVersion.isAfter(currentVersion)) {
    const asset = response.json.assets.find(a => a.name.includes(process.platform));
    const download = asset?.browser_download_url ?? response.json.html_url;

    status = statusNeedUpdate(latestVersion.raw, download);
  }

  const statusWithMessage = wrapString(status, args);

  args.logger.debug(`saving to cache storage`);
  args.store.caches.set("appStatus", statusWithMessage);

  return statusWithMessage;
});
