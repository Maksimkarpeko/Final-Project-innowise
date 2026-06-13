"use client";

import { AuthPanel } from "@/src/widgets";
import { APP_TEXT, PATH } from "@/src/shared";

export const LoginPage = () => {
  const { title, subtitle, primaryButtonText, secondaryButtonText } =
    APP_TEXT.login;
  return (
    <main className="min-h-dvh w-full bg-[#f5f5f7]">
      <AuthPanel
        title={title}
        subtitle={subtitle}
        primaryButtonText={primaryButtonText}
        secondaryButtonText={secondaryButtonText}
        secondaryLinkHref={PATH.AUTH.FORGOT_PASSWORD}
      />
    </main>
  );
};
