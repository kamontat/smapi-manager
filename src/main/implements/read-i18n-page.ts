import { MainAPIs, READ_I18N_PAGE } from "@common/communication";

import I18nLoader from "../i18n";
import en from "../i18n/lang/en";

const i18n = new I18nLoader("en", en);
const readI18nPage: MainAPIs[typeof READ_I18N_PAGE] = async (_, data) => {
  return i18n.queryPage(data.subtype, data.input);
};

export default readI18nPage;
export { READ_I18N_PAGE };
