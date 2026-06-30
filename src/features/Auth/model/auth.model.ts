import z from "zod";

import { Translations } from "@/src/shared/i18n/types";

export const createAuthFormModel = (t: Translations) =>
  z.object({
    email: z.string().email().optional(),
    password: z
      .string()
      .min(8, { message: t.auth.validation.passwordMinLength }),
  });

export type AuthFormValues = z.infer<ReturnType<typeof createAuthFormModel>>;
