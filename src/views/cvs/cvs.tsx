"use client";

import { useLocale } from "@/src/shared";

export const CvsPage = () => {
  const { t } = useLocale();

  return <div>{t.cv.page.title}</div>;
};
