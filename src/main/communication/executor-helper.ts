import type { DataLoader, DataMapper } from "@common/communication";
import type { Mapping, Handler, ExecutorArguments } from "@main/communication";

type Modifier<M extends DataMapper<string>, NM extends DataMapper<string>> = (data: DataLoader<M>) => DataLoader<NM>;

class ExecutorHelper<K extends keyof Mapping = keyof Mapping, M extends Mapping[K] = Mapping[K]> {
  static wrapper<K extends keyof Mapping = keyof Mapping, M extends Mapping[K] = Mapping[K]>(
    handler: Handler<K, M>
  ): ExecutorHelper<K, M> {
    return new ExecutorHelper(handler);
  }

  private handler: Handler;
  private constructor(handler: Handler<K, M>) {
    this.handler = handler;
  }

  async exec<CM extends DataMapper<string>>(
    obj: ExecutorArguments<CM>,
    modifier: Modifier<CM, M> = d => (d as unknown) as DataLoader<M>
  ): Promise<M["output"]> {
    const newData = modifier(obj.data);
    const newObject: ExecutorArguments<M> = Object.assign({}, obj, { data: newData });

    return this.handler.executor(newObject);
  }
}

export { ExecutorHelper };
