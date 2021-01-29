import { MainAPIs, READ_I18N } from "@common/communication";

import I18nLoader from "../i18n";
import en from "../i18n/lang/en";

const i18n = new I18nLoader("en", en);
const readI18n: MainAPIs[typeof READ_I18N] = async (_, data) => {
  return i18n.query(data.subtype, data.input.key, data.input.value);
};

export default readI18n;
export { READ_I18N };
