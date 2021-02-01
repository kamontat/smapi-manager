import type { Analytics } from "@common/analytics";
import type { Logger } from "@common/logger";
import type { Storage } from "@common/storage";

type AppExecutorProps = {
  event: string;
  store: Storage;
  analytic: Analytics;
  logger: Logger;
};

type AppExecutor = (props: AppExecutorProps) => void;

export type { AppExecutor, AppExecutorProps };
