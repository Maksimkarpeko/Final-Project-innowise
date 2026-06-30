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

export type ForgotPasswordFormValues = {
    email: string;
};

export type ForgotPasswordVariables = {
    auth: {
        email: string;
    };
};

export type ForgotPasswordResponse = {
    forgotPassword: null;
};

export const forgotPasswordModel = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
});

export type ResetPasswordFormValues = {
    newPassword: string;
    confirmPassword: string;
};

export type ResetPasswordVariables = {
    auth: {
        newPassword: string;
    };
};

export type ResetPasswordResponse = {
    resetPassword: null;
};

export const resetPasswordModel = z
    .object({
        newPassword: z
            .string()
            .min(1, "Password is required")
            .min(6, "Password must be at least 6 characters"),

        confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });