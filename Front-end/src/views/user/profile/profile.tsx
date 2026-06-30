"use client";

import { getUserId, PATH, useProfileNavItems } from "@/src/shared";
import { NavHeader } from "@/src/widgets";
import { UserProfile } from "@/src/features";

type UserProfilePageProps = {
  userId: string;
};

export const UserProfilePage = ({ userId }: UserProfilePageProps) => {
  const currentUserId = getUserId();
  const canEdit = currentUserId === userId;
  const navItems = useProfileNavItems(userId);

  return (
    <div className="w-full px-6">
      <NavHeader items={navItems} />
      <section className="mt-6 w-full">
        <UserProfile userId={userId} canEdit={canEdit} />
      </section>
    </div>
  );
};
