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
    PROFILE: (userId: string) => `/users/${userId}/profile`,
    LIST: "/list",
    CVS: "/user-cvs",
    SKILLS: (userId: string) => `/users/${userId}/skills`,
    LANGUAGES: (userId: string) => `/users/${userId}/languages`,
    SETTINGS: "/settings",
  },
  COMMON: {
    CVS: "/cvs",
  },
} as const;

export type AuthPath = typeof PATH.AUTH;
