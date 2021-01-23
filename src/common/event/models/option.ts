import type ProcessorType from "@common/constants/processor-type";

type EventType = { type: string; subtype?: string };
type EventValue<T> = { value?: T };
type EventOrigin = { origin: ProcessorType };

type EventOption<T = unknown> = EventType & EventValue<T>;
type EventObject<T = unknown> = EventOption<T> & EventOrigin;

export type { EventOption, EventObject };
