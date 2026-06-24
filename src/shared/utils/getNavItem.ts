import { PATH } from "@/src/shared";

export const getNavItems = (userId: string) => {
  return [
    {
      content: "Profile",
      href: PATH.USER.PROFILE(userId),
    },
    {
      content: "Skills",
      href: PATH.USER.SKILLS(userId),
    },
    {
      content: "Languages",
      href: PATH.USER.LANGUAGES(userId),
    },
  ];
};
