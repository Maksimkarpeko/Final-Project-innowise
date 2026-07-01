"use client";

import { LanguagesPage } from "@/src/features";
import { useProfileNavItems } from "@/src/shared";
import { NavHeader } from "@/src/widgets";

type UserProfilePageProps = {
  userId?: string;
};

export const UserLanguagesPage = ({ userId }: UserProfilePageProps) => {

    const navItems = useProfileNavItems(userId);

    if (!userId) {
    return (
      <section className="px-6 w-full pt-4">
        <LanguagesPage />
      </section>
    );
  }

  return (
    <div className="w-full px-6">
      <NavHeader items={navItems} />
      <section className="mt-6 w-full">
        <LanguagesPage userId={userId} />
      </section>
    </div>
  );
};
