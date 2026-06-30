"use client";

import { AuthPanel } from "@/src/widgets";
import { PATH, useLocale } from "@/src/shared";

export const SignUpPage = () => {
  const { t } = useLocale();

  return (
    <main className="min-h-dvh w-full bg-[#f5f5f7]">
      <AuthPanel
        title={t.auth.signUp.title}
        subtitle={t.auth.signUp.subtitle}
        primaryButtonText={t.auth.signUp.submit}
        secondaryButtonText={t.auth.signUp.hasAccount}
        secondaryLinkHref={PATH.AUTH.LOGIN}
      />
    </main>
  );
};
