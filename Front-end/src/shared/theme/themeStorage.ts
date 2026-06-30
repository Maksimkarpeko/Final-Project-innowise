import type { AppearanceMode } from "./types";

export const APPEARANCE_STORAGE_KEY = "appearance";

export const DEFAULT_APPEARANCE: AppearanceMode = "light";

export const getStoredAppearance = (): AppearanceMode => {
    if (typeof window === "undefined") {
        return DEFAULT_APPEARANCE;
    }

    const storedAppearance = localStorage.getItem(APPEARANCE_STORAGE_KEY);

    if (
        storedAppearance === "systemTheme" ||
        storedAppearance === "night" ||
        storedAppearance === "light"
    ) {
        return storedAppearance;
    }

    return DEFAULT_APPEARANCE;
};

export const getIsSystemDark = () => {
    if (typeof window === "undefined") {
        return false;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const getIsDarkAppearance = (appearance: AppearanceMode) => {
    return appearance === "night" || (appearance === "systemTheme" && getIsSystemDark());
};

export const applyAppearance = (appearance: AppearanceMode) => {
    if (typeof window === "undefined") {
        return;
    }

    document.documentElement.classList.toggle(
        "dark",
        getIsDarkAppearance(appearance),
    );
};

export const notifyAppearanceChanged = () => {
    if (typeof window === "undefined") {
        return;
    }

    window.dispatchEvent(new Event("app-appearance-change"));
};