import z from "zod";

import { Translations } from "@/src/shared/i18n/types";

export const createUserProfileFormModel = (t: Translations) =>
  z.object({
    firstName: z
      .string()
      .min(1, { message: t.profile.validation.firstNameRequired }),
    lastName: z
      .string()
      .min(1, { message: t.profile.validation.lastNameRequired }),
    departmentId: z
      .string()
      .min(1, { message: t.profile.validation.departmentRequired }),
    positionId: z
      .string()
      .min(1, { message: t.profile.validation.positionRequired }),
  });

export type UserProfileFormValues = z.infer<
  ReturnType<typeof createUserProfileFormModel>
>;

export type UserProfileOption = {
  id: string;
  name: string;
};
