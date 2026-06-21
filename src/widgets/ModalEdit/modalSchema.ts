import z from "zod";

export const modalSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  position: z.string().optional(),
  department: z.string().optional(),
  role: z.string().optional()
});

export type ModalSchemaValues = z.infer<typeof modalSchema>;
