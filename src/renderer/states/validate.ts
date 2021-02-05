import { Writable, writable } from "svelte/store";
import type { UseAction } from "./models/UseAction";

type Validator = (value: string) => true | string;
type Validity = { valid: boolean; message?: string };

const requireValidator: Validator = v => (v !== undefined && v !== null && v !== "") || "This field is required";
const numberValidator: Validator = v => isFinite(parseInt(v)) || "Please enter only number";

const buildValidator = (validators: Validator[]): ((v: string) => Validity) => {
  return value => {
    if (validators.length < 1) return { valid: true };

    for (const validator of validators) {
      const message = validator(value);
      if (message !== true)
        return {
          valid: false,
          message: message,
        };
    }

    return {
      valid: true,
    };
  };
};

const createValidation = (
  ...validators: Validator[]
): { validity: Writable<Validity>; validate: UseAction<string> } => {
  const validity = writable<Validity>({ valid: true, message: undefined });
  const validator = buildValidator(validators);

  const validate: UseAction<string> = (_, value) => {
    const valid = (value: string) => {
      validity.set(validator(value));
    };

    valid(value);
    return {
      update(value) {
        valid(value);
      },
    };
  };

  return { validity, validate };
};

export default createValidation;
export type { Validator, Validity };
export { requireValidator, numberValidator };
