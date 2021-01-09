import EventFullObject, { EventObject, Origin } from "@common/models/event";

export const createEvent = <T>(obj: EventFullObject<T>): EventFullObject<T> => {
  return obj;
};

export const createPreloadEvent = <T>(obj: EventObject<T>): EventFullObject<T> => {
  return Object.assign({}, obj, { origin: Origin.PRELOAD });
};

export const createRendererEvent = <T>(obj: EventObject<T>): EventFullObject<T> => {
  return Object.assign({}, obj, { origin: Origin.RENDERER });
};

export const createMainEvent = <T>(obj: EventObject<T>): EventFullObject<T> => {
  return Object.assign({}, obj, { origin: Origin.MAIN });
};
