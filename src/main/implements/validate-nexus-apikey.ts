import { handler, VALIDATE_NEXUS_APIKEY } from "@main/communication";
import NexusRequest from "@common/nexus";

export const validateNexusApikey = handler(VALIDATE_NEXUS_APIKEY, async ({ store, data }) => {
  const apikey = data.input;

  const request = new NexusRequest(apikey);
  const validation = await request.verifyUser();

  if (validation.code === 200) {
    const information = await request.getInformation();
    if (information.code === 200) {
      store.caches.set("nexusInformation", information.json);
    }
  }

  return validation;
});
