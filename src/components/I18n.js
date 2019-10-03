import React, { createContext, useState, useContext, useMemo } from 'react';

const I18nContext = createContext();

export function I18nProvider({ translations, defaultLocale, children }) {
  const [locale, setLocale] = useState(defaultLocale);
  const value = useMemo(() => ({ translations, locale, setLocale }), [
    locale,
    translations,
  ]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => {
  return useContext(I18nContext);
};

export function useTranslate(id) {
  const { locale, translations } = useContext(I18nContext);
  return translations[locale][id];
}
