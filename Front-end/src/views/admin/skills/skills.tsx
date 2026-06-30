"use client";

import { useLocale } from "@/src/shared";

export const AdminSkillsPage = () => {
  const { t } = useLocale();

  return <div>{t.admin.skills.title}</div>;
};
