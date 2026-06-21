import z from "zod";

export const userProfileFormModel = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    departmentId: z.string().min(1, { message: "Department is required" }),
    positionId: z.string().min(1, { message: "Position is required" }),
});

export type UserProfileFormValues = z.infer<typeof userProfileFormModel>;

export type UserProfileOption = {
    id: string;
    name: string;
};