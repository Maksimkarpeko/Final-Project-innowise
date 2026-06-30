"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import {
    GetDepartments,
    GetPositions,
    GetUserProfile,
    UpdateProfile,
    UpdateUser,
    UploadAvatar,
} from "../api/userProfile.api";
import {
    UserProfileFormValues,
    UserProfileOption,
} from "../model/userProfile.model";

type UserProfileQuery = {
    user: {
        id: string;
        email: string;
        created_at: string;
        role: string;
        department: UserProfileOption | null;
        position: UserProfileOption | null;
        profile: {
            id: string;
            first_name: string | null;
            last_name: string | null;
            full_name: string | null;
            avatar: string | null;
        };
    };
};

type DepartmentsQuery = {
    departments: UserProfileOption[];
};

type PositionsQuery = {
    positions: UserProfileOption[];
};

export const useUserProfile = (userId: string) => {
    const {
        data: userData,
        loading: isUserLoading,
        error: userError,
        refetch: refetchUser,
    } = useQuery<UserProfileQuery>(GetUserProfile, {
        variables: { userId },
        skip: !userId,
    });

    const {
        data: departmentsData,
        loading: isDepartmentsLoading,
        error: departmentsError,
    } = useQuery<DepartmentsQuery>(GetDepartments);

    const {
        data: positionsData,
        loading: isPositionsLoading,
        error: positionsError,
    } = useQuery<PositionsQuery>(GetPositions);

    const [updateUser, { loading: isUpdateUserLoading, error: updateUserError }] =
        useMutation(UpdateUser);

    const [
        updateProfile,
        { loading: isUpdateProfileLoading, error: updateProfileError },
    ] = useMutation(UpdateProfile);

    const user = userData?.user;

    const initialValues: UserProfileFormValues | null = user
        ? {
            firstName: user.profile.first_name ?? "",
            lastName: user.profile.last_name ?? "",
            departmentId: user.department?.id ?? "",
            positionId: user.position?.id ?? "",
        }
        : null;

    const [uploadAvatar] = useMutation(UploadAvatar);

    const handleUpdateProfile = async (
        values: UserProfileFormValues & {
            avatarFile?: {
                base64: string;
                size: number;
                type: string;
            } | null;
        },
    ) => {
        if (!user) return;

        await updateProfile({
            variables: {
                profile: {
                    userId: user.id,
                    first_name: values.firstName,
                    last_name: values.lastName,
                },
            },
        });

        await updateUser({
            variables: {
                user: {
                    userId: user.id,
                    departmentId: values.departmentId,
                    positionId: values.positionId,
                },
            },
        });

        if (values.avatarFile) {
            await uploadAvatar({
                variables: {
                    avatar: {
                        userId: user.id,
                        base64: values.avatarFile.base64,
                        size: values.avatarFile.size,
                        type: values.avatarFile.type,
                    },
                },
            });
        }

        await refetchUser();
    };

    return {
        user,
        initialValues,
        departments: departmentsData?.departments ?? [],
        positions: positionsData?.positions ?? [],

        isLoading: isUserLoading || isDepartmentsLoading || isPositionsLoading,
        isUpdating: isUpdateUserLoading || isUpdateProfileLoading,

        error:
            userError ||
            departmentsError ||
            positionsError ||
            updateUserError ||
            updateProfileError,

        handleUpdateProfile,
    };
};