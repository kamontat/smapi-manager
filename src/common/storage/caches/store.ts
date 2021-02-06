import CoreStorage from "../core/store";
import { defaults, schema } from "./data";

import type { CachesValue } from "./data";

const name = "caches";
class CachesStore extends CoreStorage<typeof name, CachesValue> {
  constructor() {
    super(name, defaults, schema);
  }
}

export default CachesStore;
