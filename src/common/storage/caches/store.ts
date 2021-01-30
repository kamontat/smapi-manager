import CoreStorage from "../core/store";
import defaults, { CachesValue } from "./data";

class CachesStore extends CoreStorage<"caches", CachesValue> {
  constructor() {
    super("caches", defaults);
  }
}

export default CachesStore;
