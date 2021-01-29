import CoreStorage from "../core/store";
import defaults, { ModValue } from "./data";

class ModStore extends CoreStorage<"mod", ModValue> {
  constructor() {
    super("mod", defaults);
  }
}

export default ModStore;
