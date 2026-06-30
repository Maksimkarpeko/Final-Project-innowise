import { PATH } from "../config/path.config";
import { useLocale } from "./LocaleProvider";

export const useProfileNavItems = (userId: string) => {
  const { t } = useLocale();

  return [
    {
      content: t.nav.profile,
      href: PATH.USER.PROFILE(userId),
    },
    {
      content: t.nav.skills,
      href: PATH.USER.SKILLS(userId),
    },
    {
      content: t.nav.languages,
      href: PATH.USER.LANGUAGES(userId),
    },
  ];
};

export const useCvNavItems = (userId: string, cvId: string) => {
  const { t } = useLocale();

  return [
    {
      content: t.nav.cv.details,
      href: PATH.USER.CV.DETAILS(userId, cvId),
    },
    {
      content: t.nav.cv.skills,
      href: PATH.USER.CV.SKILLS(userId, cvId),
    },
    {
      content: t.nav.cv.projects,
      href: PATH.USER.CV.PROJECTS(userId, cvId),
    },
    {
      content: t.nav.cv.preview,
      href: PATH.USER.CV.PREVIEW(userId, cvId),
    },
  ];
};
