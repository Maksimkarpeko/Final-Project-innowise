import { Translations } from "../types";

export const en: Translations = {
  common: {
    loading: "Loading...",
    updating: "Updating...",
    submit: "Submit",
    cancel: "Cancel",
    confirm: "Confirm",
    add: "Add",
    update: "Update",
    delete: "Delete",
    edit: "Edit",
    remove: "Remove",
    close: "Close",
    search: "Search",
  },
  sidebar: {
    menu: {
      employees: "Employees",
      skills: "Skills",
      languages: "Languages",
      cvs: "CVs",
    },
    profileMenu: {
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
    },
    userFallback: {
      name: "Noname",
      hint: "You need to fill in the details",
    },
  },
  nav: {
    profile: "Profile",
    skills: "Skills",
    languages: "Languages",
    cv: {
      details: "Details",
      skills: "Skills",
      projects: "Projects",
      preview: "Preview",
    },
  },
  auth: {
    header: {
      login: "Log in",
      register: "Sign in",
    },
    login: {
      title: "Welcome back",
      subtitle: "Welcome! Please sign in to continue.",
      submit: "Login",
      forgotPassword: "Forgot your password?",
    },
    signUp: {
      title: "Register now",
      subtitle: "Welcome! Create an account to continue.",
      submit: "Create an account",
      hasAccount: "I have an account",
    },
    forgotPassword: {
      title: "Forgot Password",
    },
    form: {
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
    },
    validation: {
      passwordMinLength: "Password must be at least 8 characters long",
    },
  },
  employees: {
    table: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      department: "Department",
      position: "Position",
    },
    actions: {
      update: "Update",
      profile: "Profile",
    },
    modalEdit: {
      title: "Update user",
      email: "Email",
      password: "Password",
      firstName: "First Name",
      lastName: "Last Name",
      department: "Department",
      position: "Position",
      role: "Role",
      employee: "Employee",
    },
  },
  profile: {
    form: {
      firstName: "First Name",
      lastName: "Last Name",
      department: "Department",
      position: "Position",
    },
    avatar: {
      uploadTitle: "Upload avatar image",
      uploadHint: "png, jpg or gif no more than 0.5MB",
    },
    memberSince: "A member since",
    memberSinceUnknown: "Unknown date",
    errors: {
      notFound: "User not found",
    },
    validation: {
      firstNameRequired: "First name is required",
      lastNameRequired: "Last name is required",
      departmentRequired: "Department is required",
      positionRequired: "Position is required",
    },
  },
  skills: {
    actions: {
      addSkill: "ADD SKILL",
      removeSkills: "REMOVE SKILLS",
      addNew: "+ Add new skill",
    },
    modal: {
      addTitle: "Add skill",
      updateTitle: "Update skill",
      skillLabel: "Skill",
      masteryLabel: "Skill mastery",
    },
    category: {
      other: "Other",
    },
    mastery: {
      novice: "Novice",
      advanced: "Advanced",
      competent: "Competent",
      proficient: "Proficient",
      expert: "Expert",
    },
  },
  languages: {
    actions: {
      add: "Add language",
      remove: "Remove languages",
    },
    modal: {
      addTitle: "Add language",
      updateTitle: "Update language",
    },
    form: {
      languageLabel: "Language",
      languagePlaceholder: "Select language",
      proficiencyLabel: "Language proficiency",
    },
    empty: {
      none: "No languages added yet",
    },
    proficiency: {
      a1: "A1",
      a2: "A2",
      b1: "B1",
      b2: "B2",
      c1: "C1",
      c2: "C2",
      native: "Native",
    },
  },
  cv: {
    page: {
      title: "CVS",
    },
    list: {
      createButton: "CREATE CV",
    },
    table: {
      name: "Name",
      education: "Education",
      employee: "Employee",
      noDescription: "No description provided",
    },
    form: {
      name: "Name",
      education: "Education",
      description: "Description",
    },
    actions: {
      details: "Details",
      delete: "Delete CV",
    },
    modal: {
      createTitle: "Create CV",
      deleteTitle: "Delete CV",
    },
    delete: {
      confirmPrefix: "Are you sure want to delete CV",
    },
    errors: {
      loadFailed: "Failed to load CV",
      notFound: "CV not found",
    },
    skills: {
      errors: {
        loadFailed: "Failed to load CV skills",
      },
      empty: {
        none: "No skills found",
      },
      actions: {
        add: "ADD SKILL",
        remove: "REMOVE SKILLS",
        deleteSelected: "DELETE SELECTED",
      },
      modal: {
        addTitle: "Add skill",
      },
      form: {
        skillLabel: "Skill",
        skillPlaceholder: "Select skill",
        masteryLabel: "Mastery",
      },
      validation: {
        selectSkill: "Select skill",
        selectMastery: "Select mastery",
      },
    },
    projects: {
      errors: {
        loadFailed: "Failed to load CV projects",
      },
      empty: {
        none: "No projects found",
      },
      actions: {
        add: "ADD PROJECT",
      },
      table: {
        name: "Name",
        domain: "Domain",
        startDate: "Start Date",
        endDate: "End Date",
      },
      modal: {
        addTitle: "Add project",
        updateTitle: "Update project",
        removeTitle: "Remove project",
        removeConfirm: "Are you sure you want to remove project",
      },
      form: {
        projectLabel: "Project",
        projectPlaceholder: "Select project",
        domainLabel: "Domain",
        startDate: "Start Date",
        endDate: "End Date",
        startDatePlaceholder: "Select start date",
        endDatePlaceholder: "Select end date",
        descriptionLabel: "Description",
        environmentLabel: "Environment",
        responsibilitiesLabel: "Responsibilities",
        responsibilitiesPlaceholder:
          "Developed UI components\nIntegrated API\nOptimized performance",
      },
      validation: {
        selectProject: "Select project",
        selectStartDate: "Select start date",
        selectEndDate: "Select end date",
        enterResponsibilities: "Enter responsibilities",
        startBeforeProjectStart:
          "Start date cannot be earlier than project start date",
        startAfterEnd: "Start date cannot be later than end date",
        endAfterToday: "End date cannot be later than today",
        endAfterProjectEnd: "End date cannot be later than project end date",
        endBeforeStart: "End date cannot be earlier than start date",
      },
      date: {
        tillNow: "Till now",
      },
    },
    preview: {
      defaultRole: "Software Engineer",
      sections: {
        education: "Education",
        languageProficiency: "Language proficiency",
        domains: "Domains",
        skillsTechnologies: "Skills & Technologies",
        projects: "Projects",
      },
      date: {
        present: "Present",
      },
      project: {
        role: "Role:",
        environment: "Environment:",
        responsibilities: "Responsibilities:",
      },
      exportButton: "Export PDF",
      errors: {
        elementNotFound: "Element for PDF generation not found",
        exportFailed: "Failed to export PDF",
      },
      success: {
        exported: "PDF exported successfully!",
      },
    },
  },
  admin: {
    users: {
      title: "Users",
    },
    skills: {
      title: "Skills",
    },
    project: {
      title: "Project",
    },
  },
  settings: {
    appearance: "Appearance",
    languages: "Languages",
    themes: {
      system: "System theme",
      night: "Night",
      light: "Light",
    },
    localeOptions: {
      english: "English",
      russian: "Russian",
    },
  },
};
