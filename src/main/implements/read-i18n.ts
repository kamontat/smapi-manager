import { handler, READ_I18N } from "@main/communication";

export const readI18n = handler(READ_I18N, async ({ data, i18n }) => {
  return i18n.query(data.subtype, data.input.key, data.input.value);
});
