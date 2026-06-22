export type CVDetails = {
    id: string;
    name: string;
    education: string | null;
    description: string;
};

export type CVListItem = {
    id: string;
    created_at: string;
    name: string;
    education: string | null;
    description: string;
};

export type CVDetailsFormValues = {
    name: string;
    education: string;
    description: string;
};

export type GetCVDetailsResponse = {
    cv: CVDetails;
};

export type GetCVDetailsVariables = {
    cvId: string;
};

export type UpdateCVDetailsResponse = {
    updateCv: CVDetails;
};

export type UpdateCVDetailsVariables = {
    cv: {
        cvId: string;
        name: string;
        education: string;
        description: string;
    };
};

export type GetUserCVSResponse = {
    user: {
        id: string;
        cvs: CVListItem[] | null;
    };
};

export type GetUserCVSVariables = {
    userId: string;
};