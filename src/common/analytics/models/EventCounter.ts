import type { KeyValue } from "@common/utils/array";

class EventCounter {
  private events: Map<string, number>;
  constructor() {
    this.events = new Map();
  }

  setup(eventName: string): void {
    this.events.set(eventName, this.get(eventName));
  }

  count(eventName: string): void {
    const called = this.get(eventName);
    this.events.set(eventName, called + 1);
  }

  get(eventName: string): number {
    return this.events.get(eventName) ?? 0;
  }

  all(): KeyValue<string, number>[] {
    return Array.from(this.events.entries()).map(e => ({ key: e[0], value: e[1] }));
  }
}

export default EventCounter;
