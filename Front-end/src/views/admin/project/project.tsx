"use client";

import { useLocale } from "@/src/shared";

export const AdminProjectPage = () => {
  const { t } = useLocale();

  return <div>{t.admin.project.title}</div>;
};
