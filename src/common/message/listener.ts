import { EventData, EventObject } from "@common/models/event";

export type RawListener<T> = (this: Window, event: MessageEvent<EventObject<T>>) => void;

export type Listener<T> = (msg: EventData<T>) => void;
