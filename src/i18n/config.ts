export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localeLabel: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
};
