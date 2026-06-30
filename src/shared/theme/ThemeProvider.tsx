"use client";

import { ConfigProvider, theme as antdTheme } from "antd";
import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
    useSyncExternalStore,
} from "react";

import {
    APPEARANCE_STORAGE_KEY,
    applyAppearance,
    getIsDarkAppearance,
    getStoredAppearance,
    notifyAppearanceChanged,
} from "./themeStorage";

import type { AppearanceMode, ThemeContextValue } from "./types";

const ThemeContext = createContext<ThemeContextValue | null>(null);

const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback);
    window.addEventListener("app-appearance-change", callback);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQuery.addEventListener("change", callback);

    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("app-appearance-change", callback);
        mediaQuery.removeEventListener("change", callback);
    };
};

const getSnapshot = () => {
    const appearance = getStoredAppearance();

    return JSON.stringify({
        appearance,
        isDark: getIsDarkAppearance(appearance),
    });
};

const getServerSnapshot = () => {
    return JSON.stringify({
        appearance: "light",
        isDark: false,
    });
};

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const snapshot = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );

    const parsedSnapshot = JSON.parse(snapshot) as {
        appearance: AppearanceMode;
        isDark: boolean;
    };

    const setAppearance = useCallback((nextAppearance: AppearanceMode) => {
        localStorage.setItem(APPEARANCE_STORAGE_KEY, nextAppearance);
        applyAppearance(nextAppearance);
        notifyAppearanceChanged();
    }, []);

    const value = useMemo<ThemeContextValue>(
        () => ({
            appearance: parsedSnapshot.appearance,
            isDark: parsedSnapshot.isDark,
            setAppearance,
        }),
        [parsedSnapshot.appearance, parsedSnapshot.isDark, setAppearance],
    );

    return (
        <ThemeContext.Provider value={value}>
            <ConfigProvider
                theme={{
                    algorithm: parsedSnapshot.isDark
                        ? antdTheme.darkAlgorithm
                        : antdTheme.defaultAlgorithm,
                    token: {
                        colorPrimary: "#db1c1c",
                        colorPrimaryHover: "#ff4d4d",
                        colorPrimaryActive: "#a61212",
                        colorBgLayout: parsedSnapshot.isDark ? "#303030" : "#ffffff",
                        colorBgContainer: parsedSnapshot.isDark ? "#303030" : "#ffffff",
                        colorText: parsedSnapshot.isDark
                            ? "rgba(255,255,255,0.9)"
                            : "#2e2e2e",
                        colorTextSecondary: parsedSnapshot.isDark
                            ? "rgba(255,255,255,0.6)"
                            : "#767676",
                        colorBorder: parsedSnapshot.isDark
                            ? "rgba(255,255,255,0.2)"
                            : "#d9d9d9",
                    },
                    components: {
                        Menu: {
                            itemSelectedBg: parsedSnapshot.isDark
                                ? "rgba(255,255,255,0.08)"
                                : "#eef0f2",
                            itemSelectedColor: parsedSnapshot.isDark ? "#ffffff" : "#000000",
                            itemHoverColor: parsedSnapshot.isDark ? "#ffffff" : "#000000",
                            itemHoverBg: parsedSnapshot.isDark
                                ? "rgba(255,255,255,0.06)"
                                : "#f5f5f5",
                            itemHeight: 56,
                        },
                        Table: {
                            headerBg: parsedSnapshot.isDark ? "#303030" : "#ffffff",
                            rowHoverBg: parsedSnapshot.isDark
                                ? "rgba(255,255,255,0.06)"
                                : "#fafafa",
                            colorBgContainer: parsedSnapshot.isDark ? "#303030" : "#ffffff",
                            borderColor: parsedSnapshot.isDark
                                ? "rgba(255,255,255,0.12)"
                                : "#e0e0e0",
                        },
                        Input: {
                            colorBgContainer: parsedSnapshot.isDark ? "#303030" : "#ffffff",
                            colorText: parsedSnapshot.isDark
                                ? "rgba(255,255,255,0.9)"
                                : "#2e2e2e",
                            colorBorder: parsedSnapshot.isDark
                                ? "rgba(255,255,255,0.2)"
                                : "#d9d9d9",
                        },
                        Select: {
                            colorBgContainer: parsedSnapshot.isDark ? "#303030" : "#ffffff",
                            colorText: parsedSnapshot.isDark
                                ? "rgba(255,255,255,0.9)"
                                : "#2e2e2e",
                            colorBorder: parsedSnapshot.isDark
                                ? "rgba(255,255,255,0.2)"
                                : "#d9d9d9",
                        },
                        Modal: {
                            contentBg: parsedSnapshot.isDark ? "#333333" : "#ffffff",
                            headerBg: parsedSnapshot.isDark ? "#333333" : "#ffffff",
                            titleColor: parsedSnapshot.isDark
                                ? "rgba(255,255,255,0.9)"
                                : "#2e2e2e",
                        },
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }

    return context;
};