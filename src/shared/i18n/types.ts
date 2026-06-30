export type Locale = "en" | "ru";

export type Translations = {
  common: {
    loading: string;
    updating: string;
    submit: string;
    cancel: string;
    confirm: string;
    add: string;
    update: string;
    delete: string;
    edit: string;
    remove: string;
    close: string;
    search: string;
  };
  sidebar: {
    menu: {
      employees: string;
      skills: string;
      languages: string;
      cvs: string;
    };
    profileMenu: {
      profile: string;
      settings: string;
      logout: string;
    };
    userFallback: {
      name: string;
      hint: string;
    };
  };
  nav: {
    profile: string;
    skills: string;
    languages: string;
    cv: {
      details: string;
      skills: string;
      projects: string;
      preview: string;
    };
  };
  auth: {
    header: {
      login: string;
      register: string;
    };
    login: {
      title: string;
      subtitle: string;
      submit: string;
      forgotPassword: string;
    };
    signUp: {
      title: string;
      subtitle: string;
      submit: string;
      hasAccount: string;
    };
    forgotPassword: {
      title: string;
    };
    form: {
      emailPlaceholder: string;
      passwordPlaceholder: string;
    };
    validation: {
      passwordMinLength: string;
    };
  };
  employees: {
    table: {
      firstName: string;
      lastName: string;
      email: string;
      department: string;
      position: string;
    };
    actions: {
      update: string;
      profile: string;
    };
    modalEdit: {
      title: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      department: string;
      position: string;
      role: string;
      employee: string;
    };
  };
  profile: {
    form: {
      firstName: string;
      lastName: string;
      department: string;
      position: string;
    };
    avatar: {
      uploadTitle: string;
      uploadHint: string;
    };
    memberSince: string;
    memberSinceUnknown: string;
    errors: {
      notFound: string;
    };
    validation: {
      firstNameRequired: string;
      lastNameRequired: string;
      departmentRequired: string;
      positionRequired: string;
    };
  };
  skills: {
    actions: {
      addSkill: string;
      removeSkills: string;
      addNew: string;
    };
    modal: {
      addTitle: string;
      updateTitle: string;
      skillLabel: string;
      masteryLabel: string;
    };
    category: {
      other: string;
    };
    mastery: {
      novice: string;
      advanced: string;
      competent: string;
      proficient: string;
      expert: string;
    };
  };
  languages: {
    actions: {
      add: string;
      remove: string;
    };
    modal: {
      addTitle: string;
      updateTitle: string;
    };
    form: {
      languageLabel: string;
      languagePlaceholder: string;
      proficiencyLabel: string;
    };
    empty: {
      none: string;
    };
    proficiency: {
      a1: string;
      a2: string;
      b1: string;
      b2: string;
      c1: string;
      c2: string;
      native: string;
    };
  };
  cv: {
    page: {
      title: string;
    };
    list: {
      createButton: string;
    };
    table: {
      name: string;
      education: string;
      employee: string;
      noDescription: string;
    };
    form: {
      name: string;
      education: string;
      description: string;
    };
    actions: {
      details: string;
      delete: string;
    };
    modal: {
      createTitle: string;
      deleteTitle: string;
    };
    delete: {
      confirmPrefix: string;
    };
    errors: {
      loadFailed: string;
      notFound: string;
    };
    skills: {
      errors: {
        loadFailed: string;
      };
      empty: {
        none: string;
      };
      actions: {
        add: string;
        remove: string;
        deleteSelected: string;
      };
      modal: {
        addTitle: string;
      };
      form: {
        skillLabel: string;
        skillPlaceholder: string;
        masteryLabel: string;
      };
      validation: {
        selectSkill: string;
        selectMastery: string;
      };
    };
    projects: {
      errors: {
        loadFailed: string;
      };
      empty: {
        none: string;
      };
      actions: {
        add: string;
      };
      table: {
        name: string;
        domain: string;
        startDate: string;
        endDate: string;
      };
      modal: {
        addTitle: string;
        updateTitle: string;
        removeTitle: string;
        removeConfirm: string;
      };
      form: {
        projectLabel: string;
        projectPlaceholder: string;
        domainLabel: string;
        startDate: string;
        endDate: string;
        startDatePlaceholder: string;
        endDatePlaceholder: string;
        descriptionLabel: string;
        environmentLabel: string;
        responsibilitiesLabel: string;
        responsibilitiesPlaceholder: string;
      };
      validation: {
        selectProject: string;
        selectStartDate: string;
        selectEndDate: string;
        enterResponsibilities: string;
        startBeforeProjectStart: string;
        startAfterEnd: string;
        endAfterToday: string;
        endAfterProjectEnd: string;
        endBeforeStart: string;
      };
      date: {
        tillNow: string;
      };
    };
    preview: {
      defaultRole: string;
      sections: {
        education: string;
        languageProficiency: string;
        domains: string;
        skillsTechnologies: string;
        projects: string;
      };
      date: {
        present: string;
      };
      project: {
        role: string;
        environment: string;
        responsibilities: string;
      };
      exportButton: string;
      errors: {
        elementNotFound: string;
        exportFailed: string;
      };
      success: {
        exported: string;
      };
    };
  };
  admin: {
    users: {
      title: string;
    };
    skills: {
      title: string;
    };
    project: {
      title: string;
    };
  };
  settings: {
    appearance: string;
    languages: string;
    themes: {
      system: string;
      night: string;
      light: string;
    };
    localeOptions: {
      english: string;
      russian: string;
    };
  };
};
