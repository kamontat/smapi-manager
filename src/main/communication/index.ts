export { handler } from "./handler";
export type { Handler } from "./handler";

export type { Mapping } from "./mapping";

// reexport again in main process
export * from "@common/communication/mappers";
