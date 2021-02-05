class ConditionArray<T> {
  private arr: Array<T>;
  constructor() {
    this.arr = new Array<T>();
  }

  add(d?: T): this {
    if (d !== undefined && d !== null) {
      this.arr.push(d);
    }
    return this;
  }

  addIf(condition: boolean, d?: T): this {
    if (condition) this.add(d);
    return this;
  }

  addIfFn(fn: () => boolean, d?: T): this {
    return this.addIf(fn(), d);
  }

  result(): Array<T> {
    return this.arr;
  }
}

type KeyValue<K, V = K> = {
  key: K;
  value: V;
};

export default ConditionArray;
export type { KeyValue };
