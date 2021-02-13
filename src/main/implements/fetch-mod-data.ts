import { handler, FETCH_MOD_DATA } from "@main/communication";

import { isModServerExtender, ModExternal, modServerExtenderBuilder } from "@common/mod/v2/models/mod-server";
import NexusRequest from "@common/nexus";
import { loadFromCaches, saveToCaches } from "@common/mod/utils";
import { validateCaches } from "@common/utils/caches";

export const fetchModData = handler(FETCH_MOD_DATA, async ({ store, data, logger }) => {
  const cache = loadFromCaches(store, data.input);

  if (isModServerExtender(cache)) {
    const threshold = store.mod.get("fetchThreshold");
    const { expired } = validateCaches(threshold, cache.external);

    if (!expired) {
      logger.debug(`return valid cache data without fetch anything`);
      return cache;
    }
  }

  logger.debug(`fetching data from nexus mod server`);
  const metadata: Partial<ModExternal> = {};

  if (cache.updater.provider === "nexus") {
    const apikey = store.secrets.get("nexusModsApiKey");
    if (apikey === "") throw new Error(`APIKey is required for fetch latest update`);

    const requester = new NexusRequest(apikey);
    const nexusMetadata = await requester.getModMetadata(cache.updater.id);
    const nexusInformation = store.caches.get("nexusInformation");

    if (nexusMetadata.code === 200) {
      metadata.version = nexusMetadata.json.version;
      metadata.category = nexusInformation.categories.find(c => c.category_id === nexusMetadata.json.category_id)?.name;
    } else {
      throw new Error(
        `Fetch data from nexus metadata is return (${nexusMetadata.code}): ${nexusMetadata.json.message}`
      );
    }
  }

  const mod = modServerExtenderBuilder(cache, metadata);

  saveToCaches(store, mod);
  return mod;
});
