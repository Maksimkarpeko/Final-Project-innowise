import { LanguageProficiency } from "@/src/shared";

export type Language = {
    id: string;
    iso2: string;
    name: string;
    native_name: string;
};

export type GetUserLanguagesResponse = {
    profile: {
        id: string;
        languages: LanguageProficiency[];
    };
};

export type GetLanguagesResponse = {
    languages: Language[];
};

export type LanguageOption = {
    value: string;
    label: string;
};