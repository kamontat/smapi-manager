import CoreStorage from "../core/store";
import defaults, { SecretValue } from "./data";

class SecertStore extends CoreStorage<"secrets", SecretValue> {
  constructor() {
    super("secrets", defaults);
  }
}

export default SecertStore;
