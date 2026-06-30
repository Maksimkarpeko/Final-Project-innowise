"use client";

import { useLocale } from "@/src/shared";

export const ForgotPasswordPage = () => {
  const { t } = useLocale();

  return <div>{t.auth.forgotPassword.title}</div>;
};
