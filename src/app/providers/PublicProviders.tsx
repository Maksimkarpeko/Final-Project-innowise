"use client";

import { LocaleProvider, ThemeProvider } from "@/src/shared";
import { WrapperApollo } from "../apollo/apollo-client";
import { AppGuard } from "../guard/appGuard";
import { FC, PropsWithChildren } from "react";

export const PublicProviders: FC<PropsWithChildren> = ({ children }) => {
    return (
        <AppGuard>
            <WrapperApollo>
                <LocaleProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                </LocaleProvider>
            </WrapperApollo>
        </AppGuard>
    );
};