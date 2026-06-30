import z from "zod";

export const schemaCV = z.object({
  name: z.string(),
  education: z.string(),
  description: z.string(),
});

export type SchemaCVValue = z.infer<typeof schemaCV>;
