import { handler, READ_I18N_PAGE } from "@main/communication";

export const readI18nPage = handler(READ_I18N_PAGE, async ({ analytic, data, i18n }) => {
  analytic.nucleus.openPage(data.input);
  return i18n.queryPage(data.subtype, data.input);
});
