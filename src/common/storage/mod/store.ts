import CoreStorage from "../core/store";
import { defaults, schema } from "./data";

import type { ModValue } from "./data";

const name = "mod";
class ModStore extends CoreStorage<typeof name, ModValue> {
  constructor() {
    super(name, defaults, schema);
  }
}

export default ModStore;
