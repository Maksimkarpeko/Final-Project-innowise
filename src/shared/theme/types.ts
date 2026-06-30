export type AppearanceMode = "systemTheme" | "night" | "light";

export type ThemeContextValue = {
    appearance: AppearanceMode;
    setAppearance: (appearance: AppearanceMode) => void;
    isDark: boolean;
};