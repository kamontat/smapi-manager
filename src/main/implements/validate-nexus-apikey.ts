import { MainAPIs, VALIDATE_NEXUS_APIKEY } from "@common/communication";
import NexusRequest from "@common/nexus";

const validateNexusApikey: MainAPIs[typeof VALIDATE_NEXUS_APIKEY] = async ({ store, data }) => {
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
};

export default validateNexusApikey;
export { VALIDATE_NEXUS_APIKEY };
