"use client";

import { useLocale } from "@/src/shared";

export const AdminUsersPage = () => {
  const { t } = useLocale();

  return <div>{t.admin.users.title}</div>;
};
