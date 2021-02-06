import CoreStorage from "../core/store";
import { defaults, schema } from "./data";

import type { SecretValue } from "./data";

const name = "secrets";
class SecertStore extends CoreStorage<typeof name, SecretValue> {
  constructor() {
    super(name, defaults, schema);
  }
}

export default SecertStore;
