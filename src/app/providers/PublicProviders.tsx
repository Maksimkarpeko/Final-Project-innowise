"use client";

import { ConfigProvider } from "antd";
import { LocaleProvider } from "@/src/shared";
import { WrapperApollo } from "../apollo/apollo-client";
import { AppGuard } from "../guard/appGuard";
import { FC, PropsWithChildren } from "react";

export const PublicProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppGuard>
      <WrapperApollo>
        <LocaleProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#db1c1c",
                colorPrimaryHover: "#ff4d4d",
                colorPrimaryActive: "#a61212",
              },
            }}
          >
            {children}
          </ConfigProvider>
        </LocaleProvider>
      </WrapperApollo>
    </AppGuard>
  );
};
