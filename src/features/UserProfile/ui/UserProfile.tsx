"use client";

import { UserProfileForm } from "@/src/widgets";
import { useLocale } from "@/src/shared";
import { useUserProfile } from "../hooks/useUserProfile";

type UserProfileProps = {
  userId: string;
  canEdit: boolean;
};

export const UserProfile = ({ userId, canEdit }: UserProfileProps) => {
  const { t } = useLocale();
  const {
    user,
    initialValues,
    departments,
    positions,
    isLoading,
    isUpdating,
    error,
    handleUpdateProfile,
  } = useUserProfile(userId);

  const formatMemberSince = (createdAt?: string | number | null) => {
    if (!createdAt) {
      return t.profile.memberSinceUnknown;
    }

    const value = String(createdAt).trim();
    const date = new Date(Number(value));

    if (Number.isNaN(date.getTime())) {
      return t.profile.memberSinceUnknown;
    }

    return date.toDateString();
  };

  if (isLoading) {
    return <div className="py-8 text-center">{t.common.loading}</div>;
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-500">{error.message}</div>
    );
  }

  if (!user || !initialValues) {
    return (
      <div className="py-8 text-center">{t.profile.errors.notFound}</div>
    );
  }

  const fullName =
    user.profile.full_name ||
    `${user.profile.first_name ?? ""} ${user.profile.last_name ?? ""}`.trim() ||
    user.email;

  return (
    <UserProfileForm
      canEdit={canEdit}
      isSubmitting={isUpdating}
      initialValues={initialValues}
      fullName={fullName}
      email={user.email}
      avatar={user.profile.avatar ?? undefined}
      memberSince={formatMemberSince(user.created_at)}
      departments={departments}
      positions={positions}
      onSubmit={handleUpdateProfile}
    />
  );
};
