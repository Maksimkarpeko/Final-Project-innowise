import z from "zod";

export const schemaSkill = z.object({
  name: z.string(),
  mastery: z.string(),
});

export type SchemaSkillValues = z.infer<typeof schemaSkill>;
