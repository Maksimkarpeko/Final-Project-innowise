export const PATH = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/sign-up",
    FORGOT_PASSWORD: "/forgot-password",
  },
  ADMIN: {
    PROJECTS: "/admin_projects",
    LANGUAGES: "/admin_languages",
    POSITIONS: "/admin_positions",
    SKILLS: "/admin_skills",
  },
  USER: {
    PROFILE: (userId: string) => `/users/${userId}/profile`,
    LIST: "/list",
    SIDE_SKILLS: "/skills",
    SIDE_LANGUAGES: "/languages",
    CV: {
      LIST: (userId: string) => `/users/${userId}/cv`,

      DETAILS: (userId: string, cvId: string) =>
        `/users/${userId}/cv/${cvId}/details`,

      SKILLS: (userId: string, cvId: string) =>
        `/users/${userId}/cv/${cvId}/skills`,

      PROJECTS: (userId: string, cvId: string) =>
        `/users/${userId}/cv/${cvId}/projects`,

      PREVIEW: (userId: string, cvId: string) =>
        `/users/${userId}/cv/${cvId}/preview`,
    },
    SKILLS: (userId: string) => `/users/${userId}/skills`,
    LANGUAGES: (userId: string) => `/users/${userId}/languages`,
    SETTINGS: "/settings",
  },
  COMMON: {
    CVS: "/cvs",
  },
} as const;

export type AuthPath = typeof PATH.AUTH;
