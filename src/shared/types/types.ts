export type AuthPanelProps = {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  secondaryLinkHref: string;
};

export type User = {
  id: string;
  created_at: string;
  email: string;
  is_verified: boolean;
  profile: Profile;
  cvs: Cv[];
  department: Department;
  department_name: string;
  position: Position;
  position_name: string;
  role: UserRole;
};

export const UserRole = {
  Employee: "Employee",
  Admin: "Admin",
};

type UserRole = (typeof UserRole)[keyof typeof UserRole];

type Department = {
  id: string;
  created_at: string;
  name: string;
};

type Position = {
  id: string;
  created_at: string;
  name: string;
};

export type Cv = {
  id: string;
  created_at: string;
  name: string;
  education: string;
  description: string;
  user: User;
  projects: CvProject[];
  skills: SkillMastery[];
  languages: LanguageProficiency[];
};

export type Profile = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string;
  skills: SkillMastery[];
  languages: LanguageProficiency[];
};

export type SkillMastery = {
  name: string;
  categoryId: string;
  mastery: Mastery;
};

export const MasteryObject = {
  Novice: "Novice",
  Advanced: "Advanced",
  Competent: "Competent",
  Proficient: "Proficient",
  Expert: "Expert",
} as const;

export type Mastery = (typeof MasteryObject)[keyof typeof MasteryObject];

export type LanguageProficiency = {
  name: string;
  proficiency: Proficiency;
};

export const Proficiency = {
  A1: "A1",
  A2: "A2",
  B1: "B1",
  B2: "B2",
  C1: "C1",
  C2: "C2",
  Native: "Native",
} as const;

export type Proficiency = (typeof Proficiency)[keyof typeof Proficiency];

export type CvProject = {
  id: string;
  project: Project;
  name: string;
  internal_name: string;
  description: string;
  domain: string;
  start_date: string;
  end_date: string;
  environment: string[];
  roles: string[];
  responsibilities: string[];
};

export type Project = {
  id: string;
  created_at: string;
  name: string;
  internal_name: string;
  domain: string;
  start_date: string;
  end_date: string;
  description: string;
  environment: string[];
};

export type AuthResponse = {
  user: User;
  access_token: string;
  refresh_token: string;
};
