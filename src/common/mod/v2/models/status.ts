import { isHidden } from "@common/file-system/utils";
import type { File } from "@common/file-system";

interface ModStatus {
  /**
   * false when mod is on hidden state
   */
  visibility: boolean;
}

const builder = (file: File | string): ModStatus => {
  return {
    visibility: !isHidden(file),
  };
};

export default builder;
export type { ModStatus };
