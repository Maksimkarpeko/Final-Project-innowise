import {
  MasteryObject,
  Proficiency,
  type LanguageProficiency,
} from "../types/types";
import { Translations } from "./types";

const masteryKeyMap: Record<string, keyof Translations["skills"]["mastery"]> = {
  [MasteryObject.Novice]: "novice",
  [MasteryObject.Advanced]: "advanced",
  [MasteryObject.Competent]: "competent",
  [MasteryObject.Proficient]: "proficient",
  [MasteryObject.Expert]: "expert",
};

const proficiencyKeyMap: Record<
  LanguageProficiency["proficiency"],
  keyof Translations["languages"]["proficiency"]
> = {
  [Proficiency.A1]: "a1",
  [Proficiency.A2]: "a2",
  [Proficiency.B1]: "b1",
  [Proficiency.B2]: "b2",
  [Proficiency.C1]: "c1",
  [Proficiency.C2]: "c2",
  [Proficiency.Native]: "native",
};

export const getMasteryLabel = (t: Translations, mastery: string): string => {
  const key = masteryKeyMap[mastery];

  return key ? t.skills.mastery[key] : mastery;
};

export const getMasteryOptions = (t: Translations) =>
  Object.values(MasteryObject).map((value) => ({
    value,
    label: getMasteryLabel(t, value),
  }));

export const getProficiencyLabel = (
  t: Translations,
  proficiency: LanguageProficiency["proficiency"],
): string => {
  const key = proficiencyKeyMap[proficiency];

  return key ? t.languages.proficiency[key] : proficiency;
};

export const getProficiencyOptions = (t: Translations) =>
  Object.values(Proficiency).map((value) => ({
    value,
    label: getProficiencyLabel(t, value),
  }));

export const translateCategoryName = (
  t: Translations,
  categoryName: string,
): string => {
  if (categoryName === "Other") {
    return t.skills.category.other;
  }

  return categoryName;
};

export const formatLocalizedProjectDate = (
  date: string | null | undefined,
  locale: "en" | "ru",
  tillNowLabel: string,
): string => {
  if (!date) {
    return tillNowLabel;
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-GB").format(
    parsedDate,
  );
};
