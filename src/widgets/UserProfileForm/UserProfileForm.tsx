"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadAvatarIcon, useLocale } from "@/src/shared";
import {
    createUserProfileFormModel,
    type UserProfileFormValues,
    type UserProfileOption,
} from "@/src/features";
import {
    ProfileReadOnlyField,
    ProfileSelectField,
    ProfileTextField,
} from "./components/ProfileField";

type AvatarFileValue = {
    base64: string;
    size: number;
    type: string;
};

type UserProfileSubmitValues = UserProfileFormValues & {
    avatarFile?: AvatarFileValue | null;
};

type UserProfileFormProps = {
    canEdit: boolean;
    isSubmitting: boolean;
    initialValues: UserProfileFormValues;
    fullName: string;
    email: string;
    avatar?: string | null;
    memberSince: string;
    departments: UserProfileOption[];
    positions: UserProfileOption[];
    onSubmit: (values: UserProfileSubmitValues) => Promise<void> | void;
};

const MAX_AVATAR_SIZE = 512 * 1024;

const ALLOWED_AVATAR_TYPES = ["image/png", "image/jpeg", "image/gif"];

const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result !== "string") {
                reject(new Error("Failed to read file"));
                return;
            }

            resolve(reader.result);
        };

        reader.onerror = () => {
            reject(new Error("Failed to read file"));
        };

        reader.readAsDataURL(file);
    });
};

export const UserProfileForm = ({
                                    canEdit,
                                    isSubmitting,
                                    initialValues,
                                    fullName,
                                    email,
                                    avatar,
                                    memberSince,
                                    departments,
                                    positions,
                                    onSubmit,
                                }: UserProfileFormProps) => {
    const { t } = useLocale();

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [avatarUrl, setAvatarUrl] = useState<string | null>(avatar ?? null);
    const [avatarFile, setAvatarFile] = useState<AvatarFileValue | null>(null);
    const [avatarError, setAvatarError] = useState<string | null>(null);

    const userProfileFormModel = useMemo(
        () => createUserProfileFormModel(t),
        [t],
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
    } = useForm<UserProfileFormValues>({
        mode: "onChange",
        resolver: zodResolver(userProfileFormModel),
        defaultValues: initialValues,
    });

    useEffect(() => {
        reset(initialValues);
    }, [initialValues, reset]);

    useEffect(() => {
        setAvatarUrl(avatar ?? null);
        setAvatarFile(null);
    }, [avatar]);

    const firstLetter = fullName?.[0]?.toUpperCase() ?? "?";

    const selectedDepartmentName =
        departments.find((department) => department.id === initialValues.departmentId)
            ?.name ?? "";

    const selectedPositionName =
        positions.find((position) => position.id === initialValues.positionId)
            ?.name ?? "";

    const handleOpenFileDialog = () => {
        if (!canEdit || isSubmitting) {
            return;
        }

        fileInputRef.current?.click();
    };

    const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        event.target.value = "";

        if (!file) {
            return;
        }

        setAvatarError(null);

        if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
            setAvatarError("Only png, jpg and gif files are allowed");
            return;
        }

        if (file.size > MAX_AVATAR_SIZE) {
            setAvatarError("File must be no more than 0.5MB");
            return;
        }

        try {
            const dataUrl = await readFileAsDataUrl(file);

            setAvatarUrl(dataUrl);
            setAvatarFile({
                base64: dataUrl,
                size: file.size,
                type: file.type,
            });
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Failed to read file";

            setAvatarError(message);
        }
    };

    const handleFormSubmit = async (values: UserProfileFormValues) => {
        await onSubmit({
            ...values,
            avatarFile,
        });

        reset(values);
        setAvatarFile(null);
    };

    const profileFields = canEdit ? (
        <>
            <ProfileTextField
                id="firstName"
                label={t.profile.form.firstName}
                registration={register("firstName")}
                error={errors.firstName?.message}
            />

            <ProfileTextField
                id="lastName"
                label={t.profile.form.lastName}
                registration={register("lastName")}
                error={errors.lastName?.message}
            />

            <ProfileSelectField
                id="departmentId"
                label={t.profile.form.department}
                options={departments}
                registration={register("departmentId")}
                error={errors.departmentId?.message}
            />

            <ProfileSelectField
                id="positionId"
                label={t.profile.form.position}
                options={positions}
                registration={register("positionId")}
                error={errors.positionId?.message}
            />
        </>
    ) : (
        <>
            <ProfileReadOnlyField
                label={t.profile.form.firstName}
                value={initialValues.firstName}
            />

            <ProfileReadOnlyField
                label={t.profile.form.lastName}
                value={initialValues.lastName}
            />

            <ProfileReadOnlyField
                label={t.profile.form.department}
                value={selectedDepartmentName}
            />

            <ProfileReadOnlyField
                label={t.profile.form.position}
                value={selectedPositionName}
            />
        </>
    );

    return (
        <div className="mx-auto mt-[84px] min-h-[552px] w-[900px] bg-transparent">
            <form className="w-full" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center gap-[52px]">
                        <button
                            type="button"
                            onClick={handleOpenFileDialog}
                            disabled={!canEdit || isSubmitting}
                            className="
                flex
                h-[120px]
                w-[120px]
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border-none
                bg-[#BDBDBD]
                text-[40px]
                font-normal
                text-white
                transition-colors

                disabled:cursor-default

                dark:bg-white/35
                dark:text-[#303030]
              "
                        >
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt={fullName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                firstLetter
                            )}
                        </button>

                        {canEdit && (
                            <div className="flex w-[252px] flex-col items-start">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/gif"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />

                                <button
                                    type="button"
                                    onClick={handleOpenFileDialog}
                                    disabled={isSubmitting}
                                    className="
                    flex
                    items-center
                    gap-4
                    border-none
                    bg-transparent
                    p-0
                    text-left
                    transition-opacity

                    hover:opacity-80

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                                >
                  <span
                      className="
                      flex
                      items-center
                      justify-center
                      text-[#2E2E2E]
                      transition-colors

                      dark:text-white/90

                      [&_path]:!fill-current
                      [&_path]:!stroke-current
                      [&_svg]:!text-current
                    "
                  >
                    <UploadAvatarIcon />
                  </span>

                                    <span
                                        className="
                      text-[20px]
                      font-medium
                      leading-[32px]
                      tracking-[0.15px]
                      text-[#2E2E2E]
                      transition-colors

                      dark:text-white/90
                    "
                                    >
                    {t.profile.avatar.uploadTitle}
                  </span>
                                </button>

                                <p
                                    className="
                    mt-[3px]
                    text-[16px]
                    font-normal
                    leading-[28px]
                    tracking-[0.15px]
                    text-[#2E2E2E]/60
                    transition-colors

                    dark:text-white/60
                  "
                                >
                                    {t.profile.avatar.uploadHint}
                                </p>

                                {avatarError && (
                                    <span className="mt-2 text-[13px] text-[#D9363E]">
                    {avatarError}
                  </span>
                                )}
                            </div>
                        )}
                    </div>

                    <h1
                        className="
              mt-[32px]
              text-center
              text-[24px]
              font-normal
              leading-[32px]
              text-[#2E2E2E]
              transition-colors

              dark:text-white/90
            "
                    >
                        {fullName}
                    </h1>

                    <p
                        className="
              mt-[8px]
              text-center
              text-[16px]
              font-normal
              leading-[24px]
              tracking-[0.15px]
              text-black/60
              transition-colors

              dark:text-white/60
            "
                    >
                        {email}
                    </p>

                    <p
                        className="
              mt-[8px]
              text-center
              text-[16px]
              font-normal
              leading-[24px]
              tracking-[0.15px]
              text-[#2E2E2E]
              transition-colors

              dark:text-white/90
            "
                    >
                        {t.profile.memberSince} {memberSince}
                    </p>
                </div>

                <div className="mx-auto mt-[48px] grid w-[852px] grid-cols-[410px_410px] gap-x-[32px] gap-y-[30px]">
                    {profileFields}
                </div>

                {canEdit && (
                    <div className="mx-auto mt-[48px] flex w-[852px] justify-end">
                        <button
                            type="submit"
                            disabled={
                                (!isDirty && !avatarFile) ||
                                !isValid ||
                                isSubmitting
                            }
                            className="
                h-[48px]
                w-[410px]
                rounded-[40px]
                border-none
                bg-[#C63031]
                text-[14px]
                font-medium
                uppercase
                leading-[24.5px]
                tracking-[0.4px]
                text-white
                transition-colors

                hover:bg-[#B71C1C]

                disabled:bg-black/12
                disabled:text-black/25
                disabled:hover:bg-black/12

                dark:bg-[#D9363E]
                dark:text-white
                dark:hover:bg-[#C63031]

                dark:disabled:bg-white/14
                dark:disabled:text-white/45
                dark:disabled:hover:bg-white/14
              "
                        >
                            {isSubmitting ? t.common.updating : t.common.update}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};