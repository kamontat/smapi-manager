import { Logger } from "@common/logger";

import type LanguageType from "@common/language";

const logger = Logger.Common("i18n-loader");
class I18nLoader {
  private defaultLang: string;
  private langs: Map<string, LanguageType>;

  constructor(lang: string, obj: LanguageType) {
    this.defaultLang = lang;

    this.langs = new Map();
    this.langs.set(lang, obj);
  }

  private getDefaultValue(name: string, key: string): string {
    const keys = key.replace(/([A-Z])/g, (_, group) => {
      return `.${group}`.toLowerCase();
    });
    return `{${name}.${keys}}`;
  }

  private lazyLoad(lang: string) {
    try {
      logger.debug(`starting lazyload language ${lang}`);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const data = require(`./lang/${lang}`).default;
      this.langs.set(lang, data);
      return true;
    } catch (e) {
      logger.warn(`cannot lazyload ${lang}, fallback to ${this.defaultLang} (${e})`);
      return false;
    }
  }

  private replaceObject<A>(pageName: string, obj1: A, obj2: Partial<A>): A {
    const result = {};
    Object.keys(obj1).forEach(key => {
      const element1 = obj1[key];
      const element2 = obj2[key];

      if (element2 !== undefined && element2 !== null && element2 !== "") {
        result[key] = element2;
      } else if (element1 !== undefined && element1 !== null && element1 !== "") {
        result[key] = element1;
      } else {
        result[key] = this.getDefaultValue(pageName, key);
      }
    });

    return result as A;
  }

  queryPage<K extends keyof LanguageType>(lang: string, pageName: K): LanguageType[K] {
    const isLoaded = this.langs.has(lang) ? true : this.lazyLoad(lang);

    const defaults = this.langs.get(this.defaultLang)[pageName];
    const result = isLoaded ? this.langs.get(lang)[pageName] : {};

    return this.replaceObject(pageName, defaults, result);
  }

  query<K extends keyof LanguageType, KK extends keyof LanguageType[K]>(
    lang: string,
    pageName: K,
    pageKey: KK
  ): string {
    const result = this.queryPage(lang, pageName)[pageKey];
    if (typeof result === "string") return result;
    else if (result === undefined) return this.getDefaultValue(pageName, pageKey.toString());
  }
}

export default I18nLoader;
