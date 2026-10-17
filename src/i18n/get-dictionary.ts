import "server-only";
import type { Locale } from "./config";

const dictionaries = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  id: () => import("./dictionaries/id").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
