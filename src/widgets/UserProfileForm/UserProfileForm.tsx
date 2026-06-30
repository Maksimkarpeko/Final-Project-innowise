"use client";

import { useEffect, useMemo } from "react";
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
  onSubmit: (values: UserProfileFormValues) => Promise<void> | void;
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

  const firstLetter = fullName?.[0]?.toUpperCase() ?? "?";

  const selectedDepartmentName =
    departments.find((department) => department.id === initialValues.departmentId)
      ?.name ?? "";

  const selectedPositionName =
    positions.find((position) => position.id === initialValues.positionId)
      ?.name ?? "";

  const handleFormSubmit = async (values: UserProfileFormValues) => {
    await onSubmit(values);
    reset(values);
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
            <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full bg-[#BDBDBD] text-[40px] font-normal text-white">
              {avatar ? (
                <img
                  src={avatar}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                firstLetter
              )}
            </div>

            {canEdit && (
              <div className="flex w-[252px] flex-col items-start">
                <div className="flex items-center gap-4">
                  <UploadAvatarIcon />

                  <span className="text-[20px] font-medium leading-[32px] tracking-[0.15px] text-[#2E2E2E]">
                    {t.profile.avatar.uploadTitle}
                  </span>
                </div>

                <p className="mt-[3px] text-[16px] font-normal leading-[28px] tracking-[0.15px] text-[#2E2E2E]/60">
                  {t.profile.avatar.uploadHint}
                </p>
              </div>
            )}
          </div>

          <h1 className="mt-[32px] text-center text-[24px] font-normal leading-[32px] text-[#2E2E2E]">
            {fullName}
          </h1>

          <p className="mt-[8px] text-center text-[16px] font-normal leading-[24px] tracking-[0.15px] text-black/60">
            {email}
          </p>

          <p className="mt-[8px] text-center text-[16px] font-normal leading-[24px] tracking-[0.15px] text-[#2E2E2E]">
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
              disabled={!isDirty || !isValid || isSubmitting}
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
                                disabled:bg-black/12
                                disabled:text-black/25
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
