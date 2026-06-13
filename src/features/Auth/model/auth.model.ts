import z from "zod";

export const authFormModel = z.object({
  email: z.string().email().optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type AuthFormValues = z.infer<typeof authFormModel>;
