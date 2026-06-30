import { Mastery } from "@/src/shared";

export type AddProfileSkillInput = {
  userId: string;
  name: string;
  categoryId: string;
  mastery: Mastery;
};
