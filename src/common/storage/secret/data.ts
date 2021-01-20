import Value from "../core/value";

interface SecretValue extends Value {
  nexusModsApiKey: string;
}
type SecretKey = keyof SecretValue;

const defaults: SecretValue = {
  encryptedKey: "pA22w0Rd",
  nexusModsApiKey: "",
};

export default defaults;
export { SecretValue, SecretKey };
