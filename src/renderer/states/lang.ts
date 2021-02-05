import { writable, Writable } from "svelte/store";

const i18n: Writable<string> = writable("en");

const setLang = (lang: string): void => {
  i18n.set(lang);
};

export default i18n;
export { setLang };
