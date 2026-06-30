"use client";

import { AuthPanel } from "@/src/widgets";
import { PATH, useLocale } from "@/src/shared";

export const LoginPage = () => {
  const { t } = useLocale();

  return (
    <main className="min-h-dvh w-full bg-[#f5f5f7]">
      <AuthPanel
        title={t.auth.login.title}
        subtitle={t.auth.login.subtitle}
        primaryButtonText={t.auth.login.submit}
        secondaryButtonText={t.auth.login.forgotPassword}
        secondaryLinkHref={PATH.AUTH.REGISTER}
      />
    </main>
  );
};