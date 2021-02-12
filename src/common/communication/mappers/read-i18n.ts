import type { LanguageType } from "@common/i18n";
import type { KeyValue } from "@common/utils/array";
import type { DataMapper } from "../models/data-mapper";

import wrapper from "../models/data-mapper";

const READ_I18N = "read-i18n";

type ReadI18N<K extends keyof LanguageType, KK extends keyof LanguageType[K]> = DataMapper<
  typeof READ_I18N,
  string,
  KeyValue<K, KK>,
  string
>;
const readI18N = <K extends keyof LanguageType, KK extends keyof LanguageType[K]>(
  lang: string,
  page: K,
  key: KK
): ReadI18N<K, KK> => {
  return wrapper({
    type: READ_I18N,
    subtype: lang,
    input: { key: page, value: key },
  });
};

export { READ_I18N, readI18N };
export type { ReadI18N };
