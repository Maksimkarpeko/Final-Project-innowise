export type Mastery =
    | "Novice"
    | "Advanced"
    | "Competent"
    | "Proficient"
    | "Expert";

export type CVSkill = {
    name: string;
    categoryId: string | null;
    mastery: Mastery;
};

export type CVSkillsResponse = {
    cv: {
        id: string;
        skills: CVSkill[];
    };
};

export type CVSkillsVariables = {
    cvId: string;
};

export type AddCVSkillVariables = {
    skill: {
        cvId: string;
        name: string;
        categoryId?: string | null;
        mastery: Mastery;
    };
};

export type UpdateCVSkillVariables = {
    skill: {
        cvId: string;
        name: string;
        categoryId?: string | null;
        mastery: Mastery;
    };
};

export type DeleteCVSkillVariables = {
    skill: {
        cvId: string;
        name: string[];
    };
};

export type CVSkillsMutationResponse = {
    addCvSkill?: {
        id: string;
        skills: CVSkill[];
    };
    updateCvSkill?: {
        id: string;
        skills: CVSkill[];
    };
    deleteCvSkill?: {
        id: string;
        skills: CVSkill[];
    };
};

export type SkillCategory = {
    id: string;
    name: string;
    order: number;
    parent: {
        id: string;
        name: string;
    } | null;
    children: SkillCategory[];
};

export type SkillCategoriesResponse = {
    skillCategories: SkillCategory[];
};

export type SkillCatalogItem = {
    id: string;
    name: string;
    category: {
        id: string;
        name: string;
    } | null;
    category_name: string | null;
    category_parent_name: string | null;
};

export type SkillsCatalogResponse = {
    skills: SkillCatalogItem[];
};