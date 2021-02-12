import type { LanguageType } from "./languages";

interface Translator {
  queryPage<K extends keyof LanguageType>(lang: string, pageName: K): LanguageType[K];
  query<K extends keyof LanguageType, KK extends keyof LanguageType[K]>(lang: string, pageName: K, pageKey: KK): string;
}

export type { Translator };
