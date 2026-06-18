"use client";

import { UserProfileForm } from "@/src/widgets";
import { useUserProfile } from "../hooks/useUserProfile";

type UserProfileProps = {
    userId: string;
    canEdit: boolean;
};

const formatMemberSince = (createdAt?: string | number | null) => {
    if (!createdAt) {
        return "Unknown date";
    }

    const value = String(createdAt).trim();

    const date = new Date(Number(value));

    if (Number.isNaN(date.getTime())) {
        return "Unknown date";
    }

    return date.toDateString();
};

export const UserProfile = ({ userId, canEdit }: UserProfileProps) => {
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

    if (isLoading) {
        return <div className="py-8 text-center">Loading...</div>;
    }

    if (error) {
        return (
            <div className="py-8 text-center text-red-500">
                {error.message}
            </div>
        );
    }

    if (!user || !initialValues) {
        return <div className="py-8 text-center">User not found</div>;
    }

    const fullName =
        user.profile.full_name ||
        `${user.profile.first_name ?? ""} ${user.profile.last_name ?? ""}`.trim() ||
        user.email;

    console.log("created_at from user:", user.created_at);
    console.log("formatted date:", formatMemberSince(user.created_at));

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