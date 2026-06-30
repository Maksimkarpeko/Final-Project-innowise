export type ProjectCatalogItem = {
    id: string;
    created_at?: string;
    name: string;
    internal_name: string;
    domain: string;
    start_date: string;
    end_date: string | null;
    description: string;
    environment: string[];
};

export type CVCatalogProject = {
    id: string;
    name: string;
    internal_name: string;
    domain: string;
    start_date: string;
    end_date: string | null;
    description: string;
    environment: string[];
};

export type CVProject = {
    id: string;
    name: string;
    internal_name: string;
    domain: string;
    start_date: string;
    end_date: string | null;
    description: string;
    environment: string[];
    roles: string[];
    responsibilities: string[];
    project: CVCatalogProject;
};

export type GetCVProjectsResponse = {
    cv: {
        id: string;
        projects: CVProject[] | null;
    };
};

export type GetCVProjectsVariables = {
    cvId: string;
};

export type GetProjectsResponse = {
    projects: ProjectCatalogItem[];
};

export type AddCVProjectVariables = {
    project: {
        cvId: string;
        projectId: string;
        start_date: string;
        end_date?: string | null;
        roles: string[];
        responsibilities: string[];
    };
};

export type UpdateCVProjectVariables = {
    project: {
        cvId: string;
        projectId: string;
        start_date: string;
        end_date?: string | null;
        roles: string[];
        responsibilities: string[];
    };
};

export type RemoveCVProjectVariables = {
    project: {
        cvId: string;
        projectId: string;
    };
};

export type CVProjectsMutationResponse = {
    addCvProject?: {
        id: string;
        projects: CVProject[];
    };
    updateCvProject?: {
        id: string;
        projects: CVProject[];
    };
    removeCvProject?: {
        id: string;
        projects: CVProject[];
    };
};

export type CVProjectFormValues = {
    projectId: string;
    start_date: string;
    end_date?: string | null;
    roles: string[];
    responsibilities: string[];
};