"use client";

import {AuthPanel } from "@/src/widgets";
import { PATH } from "@/src/shared";
import { APP_TEXT } from "@/src/shared";

export const SignUpPage = () => {
  const { title, subtitle, primaryButtonText, secondaryButtonText } =
    APP_TEXT.signUp;
  return (
    <main className="min-h-dvh w-full bg-[#f5f5f7]">
      <AuthPanel
        title={title}
        subtitle={subtitle}
        primaryButtonText={primaryButtonText}
        secondaryButtonText={secondaryButtonText}
        secondaryLinkHref={PATH.AUTH.LOGIN}
      />
    </main>
  );
};
