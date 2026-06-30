import { Translations } from "../types";

export const ru: Translations = {
  common: {
    loading: "Загрузка...",
    updating: "Обновление...",
    submit: "Отправить",
    cancel: "Отмена",
    confirm: "Подтвердить",
    add: "Добавить",
    update: "Обновить",
    delete: "Удалить",
    edit: "Редактировать",
    remove: "Удалить",
    close: "Закрыть",
    search: "Поиск",
  },
  sidebar: {
    menu: {
      employees: "Сотрудники",
      skills: "Навыки",
      languages: "Языки",
      cvs: "Резюме",
    },
    profileMenu: {
      profile: "Профиль",
      settings: "Настройки",
      logout: "Выйти",
    },
    userFallback: {
      name: "Без имени",
      hint: "Необходимо заполнить данные",
    },
  },
  nav: {
    profile: "Профиль",
    skills: "Навыки",
    languages: "Языки",
    cv: {
      details: "Детали",
      skills: "Навыки",
      projects: "Проекты",
      preview: "Предпросмотр",
    },
  },
  auth: {
    header: {
      login: "Войти",
      register: "Регистрация",
    },
    login: {
      title: "С возвращением",
      subtitle: "Добро пожаловать! Войдите, чтобы продолжить.",
      submit: "Войти",
      forgotPassword: "У меня еще нет аккаунта",
    },
    signUp: {
      title: "Регистрация",
      subtitle: "Добро пожаловать! Создайте аккаунт, чтобы продолжить.",
      submit: "Создать аккаунт",
      hasAccount: "У меня уже есть аккаунт",
    },
    forgotPassword: {
      title: "У меня еще нет аккаунта",
    },
    form: {
      emailPlaceholder: "Почта",
      passwordPlaceholder: "Пароль",
    },
    validation: {
      passwordMinLength: "Пароль должен содержать не менее 8 символов",
    },
  },
  employees: {
    table: {
      firstName: "Имя",
      lastName: "Фамилия",
      email: "Email",
      department: "Отдел",
      position: "Должность",
    },
    actions: {
      update: "Обновить",
      profile: "Профиль",
    },
    modalEdit: {
      title: "Обновить пользователя",
      email: "Email",
      password: "Пароль",
      firstName: "Имя",
      lastName: "Фамилия",
      department: "Отдел",
      position: "Должность",
      role: "Роль",
      employee: "Сотрудник",
    },
  },
  profile: {
    form: {
      firstName: "Имя",
      lastName: "Фамилия",
      department: "Отдел",
      position: "Должность",
    },
    avatar: {
      uploadTitle: "Загрузить аватар",
      uploadHint: "png, jpg или gif не более 0.5MB",
    },
    memberSince: "Участник с",
    memberSinceUnknown: "Неизвестная дата",
    errors: {
      notFound: "Пользователь не найден",
    },
    validation: {
      firstNameRequired: "Имя обязательно",
      lastNameRequired: "Фамилия обязательна",
      departmentRequired: "Отдел обязателен",
      positionRequired: "Должность обязательна",
    },
  },
  skills: {
    actions: {
      addSkill: "ДОБАВИТЬ НАВЫК",
      removeSkills: "УДАЛИТЬ НАВЫКИ",
      addNew: "+ Добавить навык",
    },
    modal: {
      addTitle: "Добавить навык",
      updateTitle: "Обновить навык",
      skillLabel: "Навык",
      masteryLabel: "Уровень владения",
    },
    category: {
      other: "Другое",
    },
    mastery: {
      novice: "Начинающий",
      advanced: "Продвинутый",
      competent: "Компетентный",
      proficient: "Опытный",
      expert: "Эксперт",
    },
  },
  languages: {
    actions: {
      add: "Добавить язык",
      remove: "Удалить языки",
    },
    modal: {
      addTitle: "Добавить язык",
      updateTitle: "Обновить язык",
    },
    form: {
      languageLabel: "Язык",
      languagePlaceholder: "Выберите язык",
      proficiencyLabel: "Уровень владения",
    },
    empty: {
      none: "Языки ещё не добавлены",
    },
    proficiency: {
      a1: "A1",
      a2: "A2",
      b1: "B1",
      b2: "B2",
      c1: "C1",
      c2: "C2",
      native: "Родной",
    },
  },
  cv: {
    page: {
      title: "Резюме",
    },
    list: {
      createButton: "СОЗДАТЬ РЕЗЮМЕ",
    },
    table: {
      name: "Название",
      education: "Образование",
      employee: "Сотрудник",
      noDescription: "Описание не указано",
    },
    form: {
      name: "Название",
      education: "Образование",
      description: "Описание",
    },
    actions: {
      details: "Детали",
      delete: "Удалить резюме",
    },
    modal: {
      createTitle: "Создать резюме",
      deleteTitle: "Удалить резюме",
    },
    delete: {
      confirmPrefix: "Вы уверены, что хотите удалить резюме",
    },
    errors: {
      loadFailed: "Не удалось загрузить резюме",
      notFound: "Резюме не найдено",
    },
    skills: {
      errors: {
        loadFailed: "Не удалось загрузить навыки резюме",
      },
      empty: {
        none: "Навыки не найдены",
      },
      actions: {
        add: "ДОБАВИТЬ НАВЫК",
        remove: "УДАЛИТЬ НАВЫКИ",
        deleteSelected: "УДАЛИТЬ ВЫБРАННЫЕ",
      },
      modal: {
        addTitle: "Добавить навык",
      },
      form: {
        skillLabel: "Навык",
        skillPlaceholder: "Выберите навык",
        masteryLabel: "Уровень",
      },
      validation: {
        selectSkill: "Выберите навык",
        selectMastery: "Выберите уровень",
      },
    },
    projects: {
      errors: {
        loadFailed: "Не удалось загрузить проекты резюме",
      },
      empty: {
        none: "Проекты не найдены",
      },
      actions: {
        add: "ДОБАВИТЬ ПРОЕКТ",
      },
      table: {
        name: "Название",
        domain: "Домен",
        startDate: "Дата начала",
        endDate: "Дата окончания",
      },
      modal: {
        addTitle: "Добавить проект",
        updateTitle: "Обновить проект",
        removeTitle: "Удалить проект",
        removeConfirm: "Вы уверены, что хотите удалить проект",
      },
      form: {
        projectLabel: "Проект",
        projectPlaceholder: "Выберите проект",
        domainLabel: "Домен",
        startDate: "Дата начала",
        endDate: "Дата окончания",
        startDatePlaceholder: "Выберите дату начала",
        endDatePlaceholder: "Выберите дату окончания",
        descriptionLabel: "Описание",
        environmentLabel: "Окружение",
        responsibilitiesLabel: "Обязанности",
        responsibilitiesPlaceholder:
          "Разработка UI компонентов\nИнтеграция API\nОптимизация производительности",
      },
      validation: {
        selectProject: "Выберите проект",
        selectStartDate: "Выберите дату начала",
        selectEndDate: "Выберите дату окончания",
        enterResponsibilities: "Введите обязанности",
        startBeforeProjectStart:
          "Дата начала не может быть раньше даты начала проекта",
        startAfterEnd: "Дата начала не может быть позже даты окончания",
        endAfterToday: "Дата окончания не может быть позже сегодняшней",
        endAfterProjectEnd:
          "Дата окончания не может быть позже даты окончания проекта",
        endBeforeStart:
          "Дата окончания не может быть раньше даты начала",
      },
      date: {
        tillNow: "По настоящее время",
      },
    },
    preview: {
      defaultRole: "Инженер-программист",
      sections: {
        education: "Образование",
        languageProficiency: "Владение языками",
        domains: "Домены",
        skillsTechnologies: "Навыки и технологии",
        projects: "Проекты",
      },
      date: {
        present: "Настоящее время",
      },
      project: {
        role: "Роль:",
        environment: "Окружение:",
        responsibilities: "Обязанности:",
      },
      exportButton: "Экспорт PDF",
      errors: {
        elementNotFound: "Элемент для генерации PDF не найден",
        exportFailed: "Не удалось экспортировать PDF",
      },
      success: {
        exported: "PDF успешно экспортирован!",
      },
    },
  },
  admin: {
    users: {
      title: "Пользователи",
    },
    skills: {
      title: "Навыки",
    },
    project: {
      title: "Проект",
    },
  },
  settings: {
    appearance: "Оформление",
    languages: "Языки",
    themes: {
      system: "Системная тема",
      night: "Тёмная",
      light: "Светлая",
    },
    localeOptions: {
      english: "Английский",
      russian: "Русский",
    },
  },
};
