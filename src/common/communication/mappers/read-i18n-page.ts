import type LanguageType from "@common/language";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const READ_I18N_PAGE = "read-i18n-page";

type ReadI18NPage<K extends keyof LanguageType> = DataMapper<typeof READ_I18N_PAGE, string, K, LanguageType[K]>;
const builder = <K extends keyof LanguageType>(lang: string, page: K): ReadI18NPage<K> => {
  return wrapper({
    type: READ_I18N_PAGE,
    subtype: lang,
    input: page,
  });
};

export default builder;
export { READ_I18N_PAGE };
export type { ReadI18NPage };
