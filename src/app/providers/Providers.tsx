"use client";

import { LocaleProvider, ThemeProvider } from "@/src/shared";
import { WrapperApollo } from "../apollo/apollo-client";
import { AppGuard } from "../guard/appGuard";
import { FC, PropsWithChildren } from "react";
import dynamic from "next/dynamic";

const SideBar = dynamic(
    () => import("@/src/widgets/SideBar/SideBar").then((mod) => mod.SideBar),
    { ssr: false },
);

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
      <AppGuard>
        <WrapperApollo>
          <LocaleProvider>
            <ThemeProvider>
              <div className="flex min-h-screen w-screen bg-background text-foreground transition-colors">
                <div className="shrink-0">
                  <SideBar />
                </div>

                <main className="flex-1 overflow-auto bg-background text-foreground transition-colors">
                  {children}
                </main>
              </div>
            </ThemeProvider>
          </LocaleProvider>
        </WrapperApollo>
      </AppGuard>
  );
};