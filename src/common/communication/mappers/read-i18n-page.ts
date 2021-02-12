import type { LanguageType } from "@common/i18n";
import type { DataMapper } from "../models/data-mapper";

import wrapper from "../models/data-mapper";

const READ_I18N_PAGE = "read-i18n-page";

type ReadI18nPage<K extends keyof LanguageType> = DataMapper<typeof READ_I18N_PAGE, string, K, LanguageType[K]>;
const readI18nPage = <K extends keyof LanguageType>(lang: string, page: K): ReadI18nPage<K> => {
  return wrapper({
    type: READ_I18N_PAGE,
    subtype: lang,
    input: page,
  });
};

export { READ_I18N_PAGE, readI18nPage };
export type { ReadI18nPage };
