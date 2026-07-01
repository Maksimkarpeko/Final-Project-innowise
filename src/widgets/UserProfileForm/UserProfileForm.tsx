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
        <div
            className="
        mx-auto
        mt-8
        min-h-[552px]
        w-full
        max-w-[900px]
        bg-transparent
        px-5
        pb-28

        lg:mt-[84px]
        lg:w-[900px]
        lg:px-0
        lg:pb-0
      "
        >
            <form className="w-full" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="flex flex-col items-center">
                    <div
                        className="
              flex
              w-full
              flex-col
              items-center
              justify-center
              gap-4

              sm:w-auto
              sm:flex-row
              sm:items-center
              sm:gap-8

              lg:gap-[52px]
            "
                    >
                        <button
                            type="button"
                            onClick={handleOpenFileDialog}
                            disabled={!canEdit || isSubmitting}
                            className="
                flex
                h-[96px]
                w-[96px]
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border-none
                bg-[#BDBDBD]
                text-[34px]
                font-normal
                text-white
                transition-colors

                disabled:cursor-default

                dark:bg-white/35
                dark:text-[#303030]

                lg:h-[120px]
                lg:w-[120px]
                lg:text-[40px]
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
                            <div
                                className="
                  flex
                  w-full
                  max-w-[252px]
                  flex-col
                  items-center
                  text-center

                  sm:items-start
                  sm:text-left

                  lg:w-[252px]
                "
                            >
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
                    justify-center
                    gap-3
                    border-none
                    bg-transparent
                    p-0
                    text-left
                    transition-opacity

                    hover:opacity-80

                    disabled:cursor-not-allowed
                    disabled:opacity-60

                    sm:justify-start
                    sm:gap-4
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
                      text-[16px]
                      font-medium
                      leading-[24px]
                      tracking-[0.15px]
                      text-[#2E2E2E]
                      transition-colors

                      dark:text-white/90

                      lg:text-[20px]
                      lg:leading-[32px]
                    "
                                    >
                    {t.profile.avatar.uploadTitle}
                  </span>
                                </button>

                                <p
                                    className="
                    mt-[3px]
                    text-[12px]
                    font-normal
                    leading-[18px]
                    tracking-[0.15px]
                    text-[#2E2E2E]/60
                    transition-colors

                    dark:text-white/60

                    lg:text-[16px]
                    lg:leading-[28px]
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
              mt-6
              text-center
              text-[22px]
              font-normal
              leading-[30px]
              text-[#2E2E2E]
              transition-colors

              dark:text-white/90

              lg:mt-[32px]
              lg:text-[24px]
              lg:leading-[32px]
            "
                    >
                        {fullName}
                    </h1>

                    <p
                        className="
              mt-[6px]
              text-center
              text-[14px]
              font-normal
              leading-[22px]
              tracking-[0.15px]
              text-black/60
              transition-colors

              dark:text-white/60

              lg:mt-[8px]
              lg:text-[16px]
              lg:leading-[24px]
            "
                    >
                        {email}
                    </p>

                    <p
                        className="
              mt-[6px]
              text-center
              text-[14px]
              font-normal
              leading-[22px]
              tracking-[0.15px]
              text-[#2E2E2E]
              transition-colors

              dark:text-white/90

              lg:mt-[8px]
              lg:text-[16px]
              lg:leading-[24px]
            "
                    >
                        {t.profile.memberSince} {memberSince}
                    </p>
                </div>

                <div
                    className="
            mx-auto
            mt-8
            grid
            w-full
            max-w-[852px]
            grid-cols-1
            gap-y-5

            lg:mt-[48px]
            lg:w-[852px]
            lg:grid-cols-[410px_410px]
            lg:gap-x-[32px]
            lg:gap-y-[30px]
          "
                >
                    {profileFields}
                </div>

                {canEdit && (
                    <div
                        className="
              mx-auto
              mt-8
              flex
              w-full
              max-w-[852px]
              justify-center

              lg:mt-[48px]
              lg:w-[852px]
              lg:justify-end
            "
                    >
                        <button
                            type="submit"
                            disabled={(!isDirty && !avatarFile) || !isValid || isSubmitting}
                            className="
                h-[48px]
                w-full
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

                lg:w-[410px]
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