interface EventObject<T = string> {
  type: string;
  subtype?: string;
  value?: T;
}

type EventFullObject<T = string> = EventObject<T> & {
  origin: Origin;
};

enum Origin {
  RENDERER = "renderer",
  PRELOAD = "preload",
  MAIN = "main",
}

export default EventFullObject;
export { EventObject, Origin };
