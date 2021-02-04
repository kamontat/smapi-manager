import DataLoader from "../models/data-loader";
import type { DataMapper } from "../models/data-mapper";
import type { ExecutorArguments } from "../models/executor-arguments";

class ExecutorArgumentLoader<M extends DataMapper<string>> {
  static build<M extends DataMapper<string>>(argument: ExecutorArguments<M>): ExecutorArgumentLoader<M> {
    return new ExecutorArgumentLoader(argument);
  }

  private args: ExecutorArguments<M>;
  constructor(argument: ExecutorArguments<M>) {
    this.args = argument;
  }

  type<T extends string>(type: T): ExecutorArgumentLoader<DataMapper<T, M["subtype"], M["input"], M["output"]>> {
    const mapper: DataMapper<T, M["subtype"], M["input"], M["output"]> = {
      type,
      subtype: this.args.data.subtype,
      input: this.args.data.input,
      output: this.args.data.output,
      apikey: this.args.data.apikey,
    };

    const args: ExecutorArguments<typeof mapper> = {
      analytic: this.args.analytic,
      event: this.args.event,
      store: this.args.store,
      data: DataLoader.builder(mapper),
    };

    return new ExecutorArgumentLoader(args);
  }

  subtype<ST>(subtype: ST): ExecutorArgumentLoader<DataMapper<M["type"], ST, M["input"], M["output"]>> {
    const mapper: DataMapper<M["type"], ST, M["input"], M["output"]> = {
      type: this.args.data.type,
      subtype,
      input: this.args.data.input,
      output: this.args.data.output,
      apikey: this.args.data.apikey,
    };

    const args: ExecutorArguments<typeof mapper> = {
      analytic: this.args.analytic,
      event: this.args.event,
      store: this.args.store,
      data: DataLoader.builder(mapper),
    };

    return new ExecutorArgumentLoader(args);
  }

  input<I>(i: I): ExecutorArgumentLoader<DataMapper<M["type"], M["subtype"], I, M["output"]>> {
    const mapper: DataMapper<M["type"], M["subtype"], I, M["output"]> = {
      type: this.args.data.type,
      subtype: this.args.data.subtype,
      input: i,
      output: this.args.data.output,
      apikey: this.args.data.apikey,
    };

    const args: ExecutorArguments<typeof mapper> = {
      analytic: this.args.analytic,
      event: this.args.event,
      store: this.args.store,
      data: DataLoader.builder(mapper),
    };

    return new ExecutorArgumentLoader(args);
  }

  arguments(): ExecutorArguments<M> {
    return this.args;
  }
}

export default ExecutorArgumentLoader;
