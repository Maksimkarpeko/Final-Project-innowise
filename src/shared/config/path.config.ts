export const PATH = {
  AUTH: {
    LOGIN: "login",
    REGISTER: "sign-up",
    FORGOT_PASSWORD: "forgot-password",
  },
  ADMIN: {
    PROJECTS: "projects",
    USERS: "users",
    SKILLS: "skills",
  },
  USER: {
    PROFILE: "profile", // need watch API witch use request
    LIST: "list",
    CVS: "cvs",
    LANGUAGES: "languages",
    SKILLS: "skills",
    SETTINGS: "settings",
  },
  COMMON: {
    CVS: "cvs",
  },
} as const;
