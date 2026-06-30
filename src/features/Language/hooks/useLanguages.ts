import { useMemo, useState, useSyncExternalStore } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import {
    addUserLanguage,
    getLanguages,
    getUserLanguages,
    removeUserLanguage,
    updateUserLanguage,
} from "../api/language.api";
import {
    GetLanguagesResponse,
    GetUserLanguagesResponse,
} from "../model/language.types";
import { Proficiency, type LanguageProficiency } from "@/src/shared";

const subscribeToUserId = (callback: () => void) => {
    if (typeof window === "undefined") {
        return () => {};
    }

    window.addEventListener("storage", callback);

    return () => {
        window.removeEventListener("storage", callback);
    };
};

const getUserIdSnapshot = () => {
    if (typeof window === "undefined") {
        return null;
    }

    return window.localStorage.getItem("userId");
};

const getUserIdServerSnapshot = () => null;

export const useLanguages = (userId: string) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isRemoveMode, setIsRemoveMode] = useState(false);

    const [selectedLanguage, setSelectedLanguage] = useState<string>();
    const [selectedProficiency, setSelectedProficiency] = useState<
        LanguageProficiency["proficiency"]
    >(Proficiency.A1);

    const [updatingLanguage, setUpdatingLanguage] =
        useState<LanguageProficiency | null>(null);

    const [updatingProficiency, setUpdatingProficiency] = useState<
        LanguageProficiency["proficiency"]
    >(Proficiency.A1);

    const [selectedRemoveLanguages, setSelectedRemoveLanguages] = useState<
        string[]
    >([]);

    const currentUserId = useSyncExternalStore(
        subscribeToUserId,
        getUserIdSnapshot,
        getUserIdServerSnapshot,
    );

    const canEdit = currentUserId === userId;

    const {
        data: userLanguagesData,
        loading: isUserLanguagesLoading,
        refetch: refetchUserLanguages,
    } = useQuery<GetUserLanguagesResponse>(getUserLanguages, {
        variables: { userId },
        skip: !userId,
    });

    const { data: languagesData, loading: isLanguagesLoading } =
        useQuery<GetLanguagesResponse>(getLanguages);

    const [addLanguage, { loading: isAddLoading }] = useMutation(addUserLanguage, {
        onCompleted: async () => {
            await refetchUserLanguages();
            setIsAddModalOpen(false);
            setSelectedLanguage(undefined);
            setSelectedProficiency(Proficiency.A1);
        },
    });

    const [updateLanguage, { loading: isUpdateLoading }] = useMutation(
        updateUserLanguage,
        {
            onCompleted: async () => {
                await refetchUserLanguages();
                setIsUpdateModalOpen(false);
                setUpdatingLanguage(null);
                setUpdatingProficiency(Proficiency.A1);
            },
        },
    );

    const [deleteLanguage, { loading: isRemoveLoading }] = useMutation(
        removeUserLanguage,
        {
            onCompleted: async () => {
                await refetchUserLanguages();
                setIsRemoveMode(false);
                setSelectedRemoveLanguages([]);
            },
        },
    );

    const userLanguages = userLanguagesData?.profile.languages ?? [];
    const allLanguages = languagesData?.languages ?? [];

    const languageOptions = useMemo(() => {
        const alreadyAddedNames = new Set(userLanguages.map((item) => item.name));

        return allLanguages
            .filter((language) => !alreadyAddedNames.has(language.name))
            .map((language) => ({
                value: language.name,
                label: language.name,
            }));
    }, [allLanguages, userLanguages]);

    const updateLanguageOptions = useMemo(() => {
        if (!updatingLanguage) {
            return [];
        }

        return [
            {
                value: updatingLanguage.name,
                label: updatingLanguage.name,
            },
        ];
    }, [updatingLanguage]);

    const openUpdateModal = (language: LanguageProficiency) => {
        if (!canEdit || isRemoveMode) {
            return;
        }

        setUpdatingLanguage(language);
        setUpdatingProficiency(language.proficiency);
        setIsUpdateModalOpen(true);
    };

    const toggleRemoveLanguage = (name: string) => {
        setSelectedRemoveLanguages((prev) =>
            prev.includes(name)
                ? prev.filter((item) => item !== name)
                : [...prev, name],
        );
    };

    const addSelectedLanguage = async () => {
        if (!canEdit || !userId || !selectedLanguage || !selectedProficiency) {
            return;
        }

        await addLanguage({
            variables: {
                language: {
                    userId,
                    name: selectedLanguage,
                    proficiency: selectedProficiency,
                },
            },
        });
    };

    const updateSelectedLanguage = async () => {
        if (!canEdit || !userId || !updatingLanguage) {
            return;
        }

        await updateLanguage({
            variables: {
                language: {
                    userId,
                    name: updatingLanguage.name,
                    proficiency: updatingProficiency,
                },
            },
        });
    };

    const removeSelectedLanguages = async () => {
        if (!canEdit || !userId || selectedRemoveLanguages.length === 0) {
            return;
        }

        await deleteLanguage({
            variables: {
                language: {
                    userId,
                    name: selectedRemoveLanguages,
                },
            },
        });
    };

    const cancelRemoveMode = () => {
        setIsRemoveMode(false);
        setSelectedRemoveLanguages([]);
    };

    return {
        canEdit,

        userLanguages,
        languageOptions,
        updateLanguageOptions,

        isUserLanguagesLoading,
        isLanguagesLoading,
        isAddLoading,
        isUpdateLoading,
        isRemoveLoading,

        isAddModalOpen,
        isUpdateModalOpen,
        isRemoveMode,

        selectedLanguage,
        selectedProficiency,
        updatingLanguage,
        updatingProficiency,
        selectedRemoveLanguages,

        setIsAddModalOpen,
        setIsUpdateModalOpen,
        setIsRemoveMode,
        setSelectedLanguage,
        setSelectedProficiency,
        setUpdatingProficiency,

        openUpdateModal,
        toggleRemoveLanguage,
        addSelectedLanguage,
        updateSelectedLanguage,
        removeSelectedLanguages,
        cancelRemoveMode,
    };
};