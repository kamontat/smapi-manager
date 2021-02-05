type Checker<T> = (t: T) => boolean;
type Transform<T, O> = (t: T) => O;

const stringChecker: Checker<string> = t => t !== "";

class EnvValue<T = string> {
  private _value: T;

  constructor(value: T | undefined | null, defaults: T, checker?: Checker<T>) {
    if (value === undefined || value === null || (checker && !checker(value))) this._value = defaults;
    else this._value = value;
  }

  transform<O>(defaults: O, fn: Transform<T, O>, checker?: Checker<O>): EnvValue<O> {
    return new EnvValue(fn(this._value), defaults, checker);
  }

  allows<O extends T>(...valids: O[]): EnvValue<O> {
    return this.transform(valids[0], data => {
      return valids.find(v => v === data);
    });
  }

  is(...data: T[]): boolean {
    return data.includes(this._value);
  }

  value(): T {
    return this._value;
  }
}

export const transformer = {
  boolean: (v => v === "true") as Transform<string, boolean>,
  int: (v => (isNaN(parseInt(v)) ? undefined : parseInt(v))) as Transform<string, number>,
};

export const getEnv = (name: string, defaults = ""): EnvValue<string> => {
  const env = process.env[name];
  return new EnvValue(env, defaults, stringChecker);
};

export const getEnvString = (name: string, defaults = ""): string => {
  return getEnv(name, defaults).value();
};

const union = <T extends string>(...t: T[]): T[] => t;

const nodeEnvList = union("development", "production");
export const getNodeEnv = (): EnvValue<typeof nodeEnvList[number]> =>
  getEnv("NODE_ENV", "development").allows(...nodeEnvList);

export const getCI = (): EnvValue<boolean> => getEnv("CI", "false").transform(false, transformer.boolean);
export const getDebug = (): EnvValue<boolean> => getEnv("DEBUG", "false").transform(false, transformer.boolean);
export const getTest = (): EnvValue<boolean> => getEnv("TEST", "false").transform(false, transformer.boolean);
