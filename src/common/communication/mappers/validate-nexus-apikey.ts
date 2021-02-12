import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

import type { ValidatedResponse } from "@common/nexus";

const VALIDATE_NEXUS_APIKEY = "validate-nexus-apikey";

type ValidateNexusApikey = DataMapper<typeof VALIDATE_NEXUS_APIKEY, void, string, ValidatedResponse>;
const validateNexusApikey = (apikey: string): ValidateNexusApikey => {
  return wrapper({
    type: VALIDATE_NEXUS_APIKEY,
    input: apikey,
  });
};

export { VALIDATE_NEXUS_APIKEY, validateNexusApikey };
export type { ValidateNexusApikey };
