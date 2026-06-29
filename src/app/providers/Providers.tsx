"use client";
import { ConfigProvider } from "antd";
import { WrapperApollo } from "../apollo/apollo-client";
import { AppGuard } from "../guard/appGuard";
import { FC, PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { getUserRole } from "@/src/shared";

const SideBar = dynamic(
  () => import("@/src/widgets/SideBar/SideBar").then((mod) => mod.SideBar),
  { ssr: false },
);

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const role = getUserRole();
  return (
    <AppGuard>
      <WrapperApollo>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemSelectedBg: "#eef0f2",
                itemSelectedColor: "#000000",
                itemHoverColor: "#000000",
                itemHoverBg: "#f5f5f5",
                itemHeight: 56,
              },
            },
          }}
        >
          <div className="flex min-h-screen w-screen">
            <div className="shrink-0">
              {role === "Employee" ? (
                <SideBar role="Employee" />
              ) : (
                <SideBar role="Admin" />
              )}
            </div>

            <main className="flex-1 overflow-auto bg-white">{children}</main>
          </div>
        </ConfigProvider>
      </WrapperApollo>
    </AppGuard>
  );
};
