import z from "zod";

export const modalSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
});

export type ModalSchemaValues = z.infer<typeof modalSchema>;
