import DataOrigin from "../constants/data-origin";
import builder from "./data-carrier";
import type { DataCarrier } from "./data-carrier";
import type { DataMapper } from "./data-mapper";
import type { Logger } from "@common/logger";

class DataLoader<M extends DataMapper<string>> {
  static builder<M extends DataMapper<string>>(mapper: M): DataLoader<M> {
    return new DataLoader(builder(mapper));
  }

  static load<M extends DataMapper<string>>(carrier: DataCarrier<M>): DataLoader<M> {
    return new DataLoader(carrier);
  }

  private carrier: DataCarrier<M>;
  private constructor(c: DataCarrier<M>) {
    this.carrier = c;
  }

  get type(): M["type"] {
    return this.carrier.type;
  }

  get subtype(): M["subtype"] {
    return this.carrier.subtype;
  }

  get subtypeString(): string {
    return this.subtype as string;
  }

  get input(): M["input"] {
    return this.carrier.input;
  }

  get output(): M["output"] {
    return this.carrier.output;
  }

  get apikey(): string {
    return this.carrier.apikey;
  }

  valid(apikey: string): void {
    if (this.carrier.apikey !== apikey) {
      throw new Error(`Invalid APIKEY data, you shouldn't call api by yourself`);
    }
  }

  withSubtype(subtype: M["subtype"]): this {
    this.carrier.subtype = subtype;
    return this;
  }

  withInput(input: M["input"]): this {
    this.carrier.input = input;
    return this;
  }

  withOutput(output: M["output"]): this {
    this.carrier.output = output;
    return this;
  }

  withError(error: string): this {
    this.carrier.error = error;
    return this;
  }

  log(logger: Logger): void {
    const type = `${this.carrier.type}`;
    const subtype = this.carrier.subtype ? ` (${this.carrier.subtype})` : "";
    const input = this.carrier.input ? "<encoded>" : "<empty>";
    const output = this.carrier.output ? "<encoded>" : "<empty>";
    const origin = `[${this.carrier.from.padStart(8)} => ${this.carrier.to.padEnd(8)}]`;

    logger.debug(`${origin} ${type}${subtype} input=${input} output=${output}`);
  }

  sendToPreload(): this {
    return this.from(DataOrigin.RENDERER).to(DataOrigin.PRELOAD);
  }

  sendToMain(): this {
    return this.from(DataOrigin.PRELOAD).to(DataOrigin.MAIN);
  }

  returnToPreload(): this {
    return this.from(DataOrigin.MAIN).to(DataOrigin.PRELOAD);
  }

  returnToRenderer(): this {
    return this.from(DataOrigin.PRELOAD).to(DataOrigin.RENDERER);
  }

  from(origin: DataOrigin): this {
    this.carrier.from = origin;
    return this;
  }

  to(origin: DataOrigin): this {
    this.carrier.to = origin;
    return this;
  }

  toJSON(): DataCarrier<M> {
    return this.carrier;
  }
}

export default DataLoader;
