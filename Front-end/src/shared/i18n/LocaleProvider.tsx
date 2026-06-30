"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { locales } from "./locales";
import { Locale, Translations } from "./types";

const LOCALE_STORAGE_KEY = "locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const getStoredLocale = (): Locale => {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);

  return stored === "ru" ? "ru" : "en";
};

export const LocaleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const storedLocale = getStoredLocale();
    setLocaleState(storedLocale);
    document.documentElement.lang = storedLocale;
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: locales[locale],
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextValue => {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
};
