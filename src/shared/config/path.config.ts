export const PATH = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/sign-up",
    FORGOT_PASSWORD: "/forgot-password",
  },
  ADMIN: {
    PROJECTS: "/projects",
    USERS: "/users",
    SKILLS: "/skills",
  },
  USER: {
    LIST: "/list",
    CVS: "/user-cvs",
    LANGUAGES: "/user-languages",
    SKILLS: "/user-skills",
    SETTINGS: "/settings",
  },
  COMMON: {
    CVS: "/cvs",
  },
} as const;

export type AuthPath = typeof PATH.AUTH;
