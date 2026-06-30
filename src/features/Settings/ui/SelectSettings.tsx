"use client";

import { FloatingSelect, useLocale, type Locale } from "@/src/shared";

export const SelectSettings = () => {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className=" flex flex-col w-[40%] gap-5 mt-10 ">
      <FloatingSelect
        label={t.settings.appearance}
        defaultValue={t.settings.themes.system}
        options={[
          { value: "systemTheme", label: t.settings.themes.system },
          { value: "night", label: t.settings.themes.night },
          { value: "light", label: t.settings.themes.light },
        ]}
      />
      <FloatingSelect
        label={t.settings.languages}
        value={locale}
        onChange={(value) => setLocale(value as Locale)}
        options={[
          { value: "en", label: t.settings.localeOptions.english },
          { value: "ru", label: t.settings.localeOptions.russian },
        ]}
      />
    </div>
  );
};
