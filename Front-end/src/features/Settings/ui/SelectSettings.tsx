"use client";

import {
    FloatingSelect,
    useLocale,
    useTheme,
    type AppearanceMode,
    type Locale,
} from "@/src/shared";

export const SelectSettings = () => {
    const { locale, setLocale, t } = useLocale();
    const { appearance, setAppearance } = useTheme();

    return (
        <div className="mt-10 flex w-[40%] flex-col gap-5">
            <FloatingSelect
                label={t.settings.appearance}
                value={appearance}
                onChange={(value) => setAppearance(value as AppearanceMode)}
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