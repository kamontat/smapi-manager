import type { DataMapper } from "@common/communication";
import type { ExecutorArguments } from "./executor-arguments";

type Executor<M extends DataMapper<string>> = (args: ExecutorArguments<M>) => Promise<M["output"]>;

export type { Executor };
